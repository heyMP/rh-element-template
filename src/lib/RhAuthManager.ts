// @ts-nocheck
import jwtDecode from 'jwt-decode';
import { Subject, SubscribableOrPromise } from 'rxjs';

/**
 * RhAuthManager Singleton
 * @property {Observable} user      Subscribe to the user object. Populated on changes to the jwt propoerty
 * @property {Observable} requests  Subscribe to login/logout requests
 * @property {string} jwt           Get/set the raw jwt string
 */
class RhAuthManager {
	public user = new Subject<any>();
	public requests = new Subject<any>();
	private _jwt: string | null = null;

	constructor() {
		// create a singleton pattern
		// if there is already an instance set up then
		// we are going to skip the constructor setup.
		// @ts-ignore
		if (RhAuthManager.instance == null) {
			// @ts-ignore
			RhAuthManager.instance = this;
		}
	}

	public get jwt() {
		return this._jwt;
	}

	public set jwt(token) {
		if (token === this._jwt) return;
		this._jwt = token;
		// set the user object
		if (this._jwt) {
			this.user.next(jwtDecode(this._jwt));
		} else {
			this.user.next(null);
		}
	}

	/**
	 * Request the manager to authenticate the user
	 * @return void
	 */
	requestLogin() {
		this.requests.next({ type: 'login' });
	}

	/**
	 * Request the manager to log the user out
	 * @return void
	 */
	requestLogout() {
		this.requests.next({ type: 'logout' });
	}
}

// create a single instance
export const authManager = new RhAuthManager();