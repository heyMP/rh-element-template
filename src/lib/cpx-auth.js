// @ts-nocheck
import { authManager } from '../dist/RhAuthManager.js';
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';
  var chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';
  function polyfill(input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      var bc = 0, bs, buffer, idx = 0, output = '';
      (buffer = str.charAt(idx++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
  var atob =
    (typeof window !== 'undefined' &&
      window.atob &&
      window.atob.bind(window)) ||
    polyfill;
  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str).replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = '0' + code;
        }
        return '%' + code;
      })
    );
  }
  function base64_url_decode(str) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    try {
      return b64DecodeUnicode(output);
    } catch (err) {
      return atob(output);
    }
  }
  function InvalidTokenError(message) {
    this.message = message;
  }
  InvalidTokenError.prototype = new Error();
  InvalidTokenError.prototype.name = 'InvalidTokenError';
  function jwtDecode(token, options) {
    if (typeof token !== 'string') {
      throw new InvalidTokenError('Invalid token specified');
    }
    options = options || {};
    var pos = options.header === true ? 0 : 1;
    try {
      return JSON.parse(base64_url_decode(token.split('.')[pos]));
    } catch (e) {
      throw new InvalidTokenError('Invalid token specified: ' + e.message);
    }
  }
  if (window) {
    if (typeof window.define == 'function' && window.define.amd) {
      window.define('jwt_decode', function () {
        return jwtDecode;
      });
    } else if (window) {
      window.jwt_decode = jwtDecode;
    }
  }
});
class CPXAuth1 extends HTMLElement {
  static get tag() {
    return 'cpx-auth';
  }
  authenticated = false;
  _userId = '';
  get userId() {
    return this._userId;
  }
  set userId(val) {
    if (this._userId === val) return;
    this._userId = val;
    this.setAttribute('user-id', this._userId);
  }
  _name = '';
  get name() {
    return this._name;
  }
  set name(val) {
    if (this._name === val) return;
    this._name = val;
    this.setAttribute('name', this._name);
  }
  _cookies = new Map();
  _email = '';
  get email() {
    return this._email;
  }
  set email(val) {
    if (this._email === val) return;
    this._email = val;
    this.setAttribute('email', this._email);
  }
  _ready = false;
  get ready() {
    return this._ready;
  }
  set ready(val) {
    if (this._ready === val) return;
    this._ready = val;
    this.setAttribute('ready', this._ready.toString());
  }
  _user;
  get user() {
    return this._user;
  }
  set user(val) {
    if (this._user === val) return;
    this._user = val;
    if (typeof this._user.email !== 'undefined') this.email = this._user.email;
    if (typeof this._user.name !== 'undefined') this.name = this._user.name;
    dispatchEvent(
      new CustomEvent(this.ready ? 'auth-update' : 'auth-ready', {
        detail: this,
        composed: true,
        bubbles: true,
      })
    );
    this.ready = true;
  }
  _jwtCookie = '';
  get jwtCookie() {
    return this._jwtCookie;
  }
  set jwtCookie(val) {
    if (this._jwtCookie == val) return;
    this._jwtCookie = val;
    this.setAttribute('jwt-Cookie', this._jwtCookie);
    if (this._cookies.has(this._jwtCookie)) {
      let jwtVal = this._cookies.get(this._jwtCookie);
      if (typeof jwtVal !== 'undefined') {
        this.jwtToken = this._cookies.get(this._jwtCookie);
      }
    }
  }
  _jwtToken = '';
  get jwtToken() {
    return this._jwtToken;
  }
  set jwtToken(val) {
    if (this._jwtToken === val) return;
    this._jwtToken = val;
    if (typeof this._jwtToken !== 'undefined') {
      this.user = jwt_decode(this._jwtToken);
    }
  }
  get kc() {
    return (
      (this.kcUrl.length > 0 &&
        this.kcRealm.length > 0 &&
        this.kcClientId.length > 0) ||
      this.kcConfig.length > 0
    );
  }
  _kcAuto = false;
  get kcAuto() {
    return this._kcAuto;
  }
  set kcAuto(val) {
    if (typeof val === 'string') val = true;
    if (this._kcAuto === val) return;
    this._kcAuto = val;
  }
  _keycloak;
  get keycloak() {
    return this._keycloak;
  }
  set keycloak(val) {
    if (this._keycloak === val) return;
    this._keycloak = val;
  }
  _kcUrl = '';
  get kcUrl() {
    return this._kcUrl;
  }
  set kcUrl(val) {
    if (this._kcUrl === val) return;
    this._kcUrl = val;
  }
  _kcConfig = '';
  get kcConfig() {
    return this._kcConfig;
  }
  set kcConfig(val) {
    if (this._kcConfig === val) return;
    this._kcConfig = val;
  }
  _kcConfigUrl = '';
  get kcConfigUrl() {
    return this._kcConfigUrl;
  }
  set kcConfigUrl(val) {
    if (this._kcConfigUrl === val) return;
    this._kcConfigUrl = val;
  }
  _kcOptions = '';
  get kcOptions() {
    return this._kcOptions;
  }
  set kcOptions(val) {
    if (this._kcOptions === val) return;
    this._kcOptions = val;
  }
  _kcOptionsUrl = '';
  get kcOptionsUrl() {
    return this._kcOptionsUrl;
  }
  set kcOptionsUrl(val) {
    if (this._kcOptionsUrl === val) return;
    this._kcOptionsUrl = val;
  }
  _kcRealm = '';
  get kcRealm() {
    return this._kcRealm;
  }
  set kcRealm(val) {
    if (this._kcRealm === val) return;
    this._kcRealm = val;
  }
  _kcClientId = '';
  get kcClientId() {
    return this._kcClientId;
  }
  set kcClientId(val) {
    if (this._kcClientId === val) return;
    this._kcClientId = val;
  }
  _kcToken = '';
  get kcToken() {
    return this._kcToken;
  }
  set kcToken(val) {
    if (this._kcToken === val) return;
    this._kcToken = val;
  }
  _kcTokenRefreshInterval;
  constructor() {
    super();
  }
  connectedCallback() {
    document.cookie.split(';').reduce((a, c) => {
      let kv = c.trim().split('=');
      a.set(kv[0], kv[1]);
      return a;
    }, this._cookies);
    let data = this.querySelector('script');
    if (data && data.innerText) {
      this.user = JSON.parse(data.innerText);
    }
    // subscribe to login events
    authManager.requests.subscribe({
      next: ({ type }) => {
        if (type === 'login') {
          this.login();
        }
      },
    });
  }
  static get observedAttributes() {
    return [
      'url',
      'token',
      'name',
      'email',
      'username',
      'user-id',
      'jwt-cookie',
      'jwt-token',
      'kc-url',
      'kc-realm',
      'kc-client-id',
      'kc-auto',
      'kc-config',
      'kc-config-url',
      'kc-options',
      'kc-options-url',
    ];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    this[this.camelCase(name)] = newVal;
    if (this.kc && !this.authenticated) {
      this.kcInit(this.kcConfig);
    }
  }
  validateKCConfig() {
    return false;
  }
  camelCase(str, to = true) {
    return to
      ? str.replaceAll(/-([a-z])/g, (m, g) => g.toUpperCase())
      : str.replaceAll(
        /([a-z][A-Z])/g,
        (m, g) => `${g[0]}-${g[1].toLowerCase()}`
      );
  }
  async kcInit(config) {
    if (
      typeof Keycloak !== 'undefined' &&
      ((this.kcUrl !== '' && this.kcRealm !== '' && this.kcClientId !== '') ||
        this.kcConfig !== '')
    ) {
      this.keycloak = Keycloak(
        config && config !== ''
          ? JSON.parse(config.replaceAll("'", '"'))
          : {
            url: this.kcUrl,
            realm: this.kcRealm,
            clientId: this.kcClientId,
          }
      );
      await this.keycloak
        .init(
          this.kcOptions != ''
            ? JSON.parse(this.kcOptions.replaceAll("'", '"'))
            : {}
        )
        .then(authenticated => {
          this.authenticated = authenticated;
          if (authenticated) {
            this.user = this.keycloak.tokenParsed;
            document.cookie = `${this.jwtCookie}=${this.keycloak.token}`;
            document.cookie = `${this.jwtCookie}_refresh=${this.keycloak.refreshToken}`;
            authManager.jwt = this.keycloak.token;
          } else {
            if (this.kcAuto && !this.ready) {
              this.login();
            }
          }
        });
    } else {
    }
  }
  login() {
    return this.keycloak.login();
  }
  logout() {
    return this.keycloak.logout();
  }
  register() {
    return this.keycloak.register();
  }
  account() {
    return this.keycloak.accountManagement();
  }
  get token() {
    return this.keycloak.tokenParsed;
  }
}
window.customElements.define(CPXAuth1.tag, CPXAuth1);
export { CPXAuth1 as CPXAuth };
