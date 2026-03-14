import { Component, OnInit, inject } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private keycloak = inject(Keycloak);

  profile?: KeycloakProfile;
  isAuthenticated = false;
  userRoles: string[] = [];
  async ngOnInit(): Promise<void> {
    const realmRoles = this.keycloak.realmAccess?.roles ?? [];
    const clientRoles = this.keycloak.resourceAccess?.['ecom-client-ang']?.roles ?? [];

    this.userRoles = [...realmRoles, ...clientRoles];
    this.isAuthenticated = !!this.keycloak.authenticated;

    if (this.isAuthenticated) {
      this.profile = await this.keycloak.loadUserProfile();
    }
  }

  async handleLogin(): Promise<void> {
    await this.keycloak.login({
      redirectUri: window.location.origin + '/products'
    });
  }

  async handleLogout(): Promise<void> {
    await this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}
