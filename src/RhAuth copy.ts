import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import './lib/cpx-auth.js';

export class RhAuth extends LitElement {
  @state() private kcIsInitiated: boolean = false;
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
      url: 'http://sso.redhatdotcom.traefik.me/auth', realm: 'redhat-external', clientId: 'rh_product_trials'
    }
    // const kcOptions = {
    //   enableLogging: true,
    //   onLoad: "check-sso",
    //   pkceMethod: "S256",
    //   silentCheckSsoRedirectUri: window.location.href,
    //   silentCheckSsoFallback: false,
    //   flow: 'standard'
    // }
    const kcOptions = {
      enableLogging: true,
      pkceMethod: "S256",
      // onLoad: "check-sso",
      // silentCheckSsoRedirectUri: window.location.href,
      // silentCheckSsoFallback: true,
      responseMode: 'fragment',
      flow: 'standard'
    }
    return html`
      <cpx-auth kc-config="${JSON.stringify(kcConfig)}" kc-options="${JSON.stringify(kcOptions)}"></cpx-auth>
    `;
  }

  /**
   * Request the manager to authenticate the user
   */
  login(): void {
    // @ts-ignore
    this.renderRoot.querySelector('cpx-auth')?.login();
  }
}