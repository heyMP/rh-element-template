import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import './lib/cpx-auth.js';

export class RhAuth extends LitElement {
  @state() private kcIsInitiated: boolean = false;
  @property({ type: Object }) public token: Object | null = null;
  // @property({ type: String }) public jwt: string | null = null;
  // @property({ type: Object }) public token: any | null = null;
  // @property({ type: String }) public url: string | null = null;
  // @property({ type: String, attribute: 'kc-url' }) public kcUrl: string | null = null;
  // @property({ type: String, attribute: 'kc-realm' }) public kcRealm: string | null = null;
  // @property({ type: String, attribute: 'kc-cliend-id' }) public kcClientId: string | null = null;
  // @property({ type: Boolean, attribute: 'kc-auto' }) public kcAuto: boolean | null = null;
  // @property({ type: String, attribute: 'kc-config' }) public kcConfig: any | null = null;
  // @property({ type: String, attribute: 'kc-config-url' }) public kcConfigUrl: string | null = null;
  // @property({ type: String, attribute: 'kc-options' }) public kcOptions: any | null = null;
  // @property({ type: String, attribute: 'kc-options-url' }) public kcOptionsUrl: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    setTimeout(() => {
      // @ts-ignore
      // this.renderRoot.querySelector('cpx-auth').login();
    }, 1000);
  }

  render() {
    const kcConfig = {
      url: 'http://sso.my-app.traefik.me/auth', realm: 'redhat-external', clientId: 'my_client_id'
    }
    const kcOptions = {
      enableLogging: true,
      pkceMethod: "S256",
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.href}/silent-check-sso.html`,
      silentCheckSsoFallback: false,
      // responseMode: 'fragment',
      flow: 'standard'
    }
    return html`
      <cpx-auth kc-config="${JSON.stringify(kcConfig)}" kc-options="${JSON.stringify(kcOptions)}" jwt-cookie="rh_auth"
        @auth-ready=${this._authReady} @auth-update=${this._authUpdate}>
      </cpx-auth>
      
      ${this.token ? html`
      <pre>${JSON.stringify(this.token, null, 2)}</pre>` : ''}
    `;
  }

  _authReady() {
    console.log('auth-ready');
    this.getToken();
  }

  _authUpdate() {
    this.getToken();
    console.log('auth-update');
  }

  getToken() {
    // @ts-ignore
    this.token = this.renderRoot?.querySelector('cpx-auth')?.token || null;
  }

  /**
   * Request the manager to authenticate the user
   */
  login(): void {
    // @ts-ignore
    this.renderRoot.querySelector('cpx-auth')?.login();
  }

  /**
   * Request the manager to authenticate the user
   */
  logout(): void {
    // @ts-ignore
    this.renderRoot.querySelector('cpx-auth')?.logout();
  }
}