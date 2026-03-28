import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './ui/products/products';
import { Customers } from './ui/customers/customers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideKeycloak,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
} from 'keycloak-angular';
import { Orders } from './ui/orders/orders';
import { OrderDetails } from './ui/order-details/order-details';

const apiCondition = {
  urlPattern: /^http:\/\/localhost:(8089|8091)\/api\/.*$/i,
  bearerPrefix: 'Bearer',
} as IncludeBearerTokenCondition;

@NgModule({
  declarations: [App, Products, Customers, Orders, OrderDetails],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [apiCondition],
    },
    provideKeycloak({
      config: {
        url: 'http://localhost:8090',
        realm: 'saadbr-realm',
        clientId: 'ecom-client-ang',
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      },
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
