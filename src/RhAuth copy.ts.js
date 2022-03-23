import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { SubscriptionLike } from 'rxjs';
import { authManager } from './lib/RhAuthManager';
import './lib/cpx-auth.js';

@customElement('rh-auth')
export class RhAuth extends LitElement {
  @property({ type: String }) public jwt: string | null = null;
  private authManagerSubscription: SubscriptionLike | null = null;

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    // subscribe to changes to to the jwt
    this.authManagerSubscription = authManager.user.subscribe({
      next: user => {
      },
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.authManagerSubscription)
      this.authManagerSubscription.unsubscribe();
  }

  render() {
    return html`<cpx-auth></cpx-auth>`;
  }

  /**
   * Request the manager to authenticate the user
   */
  requestLogin(): void {
    authManager.requests.next({ type: 'login' });
  }

  /**
   * Request the manager to log the user out
   */
  requestLogout(): void {
    authManager.requests.next({ type: 'logout' });
  }
}