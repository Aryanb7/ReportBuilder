
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize, map } from "rxjs/operators";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { BrowserStorageService } from './../../browser-storage/browser-storage.service';
import { IAppConfig, APP_CONFIG } from './../Config/app.config';
import { Credentials } from './../../models/auth/credentials';
import { IApiConfig, ApiConfigService } from '../config/api-config.service';
import { TokenStoreService } from './../../services/auth/token-store.service';


export enum AuthTokenType {
  AccessToken,
  RefreshToken
}

@Injectable()
export class AuthService {
  
  private rememberMeToken = "rememberMe_token";
  private authStatusSource  = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private apiConfigService: ApiConfigService,
    private tokenStoreService: TokenStoreService,
    private http: HttpClient,
    private browserStorageService: BrowserStorageService
  ) {
    this.updateStatusOnPageRefresh();
  }

  private updateStatusOnPageRefresh(): void {
    //this.authStatusSource.next(this.isLoggedIn());
  }

  rememberMe(): boolean {
    return this.browserStorageService.getLocal(this.rememberMeToken) === true;
  }

  getRawAuthToken(tokenType: AuthTokenType): string {
    if (this.rememberMe()) {
      return this.browserStorageService.getLocal(AuthTokenType[tokenType]);
    } else {
      return this.browserStorageService.getSession(AuthTokenType[tokenType]);
    }
  }

  deleteAuthTokens() {
    if (this.rememberMe()) {
      this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.AccessToken]);
      this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.RefreshToken]);
    } else {
      this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.AccessToken]);
      this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.RefreshToken]);
    }
    this.browserStorageService.removeLocal(this.rememberMeToken);
  }

  private setLoginSession(response: any): void {
    this.setToken(AuthTokenType.AccessToken, response[this.apiConfigService.configuration.accessTokenObjectKey]);
    this.setToken(AuthTokenType.RefreshToken, response[this.apiConfigService.configuration.refreshTokenObjectKey]);
  }

  private setToken(tokenType: AuthTokenType, tokenValue: string): void {
    if (this.rememberMe()) {
      this.browserStorageService.setLocal(AuthTokenType[tokenType], tokenValue);
    } else {
      this.browserStorageService.setSession(AuthTokenType[tokenType], tokenValue);
    }

  }

  login(credentials: Credentials): Observable<boolean> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(`${this.appConfig.apiEndpoint}/${this.apiConfigService.configuration.loginPath}`,
        credentials, { headers: headers })
      .pipe(
        map((response: any) => {
          // this.tokenStoreService.setRememberMe(credentials.rememberMe);
          // if (!response) {
          //   console.error("There is no `{'" + this.apiConfigService.configuration.accessTokenObjectKey +
          //     "':'...','" + this.apiConfigService.configuration.refreshTokenObjectKey + "':'...value...'}` response after login.");
          //   this.authStatusSource.next(false);
          //   return false;
          // }
          // this.tokenStoreService.storeLoginSession(response);
          // console.log("Logged-in user info", this.getAuthUser());
          // this.refreshTokenService.scheduleRefreshToken(true);
          // this.authStatusSource.next(true);
          // return true;
        }),
        catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
      );

  }

  }
