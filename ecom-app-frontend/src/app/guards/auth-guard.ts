import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;
  const requiredRole = route.data['role'];

  if (!authenticated) {
    const router = inject(Router);
    return router.parseUrl('/forbidden');
  }

  const hasRealmRole =
    grantedRoles.realmRoles?.includes(requiredRole) ?? false;

  const hasClientRole =
    grantedRoles.resourceRoles?.['ecom-client-ang']?.includes(requiredRole) ?? false;

  if (hasRealmRole || hasClientRole) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
