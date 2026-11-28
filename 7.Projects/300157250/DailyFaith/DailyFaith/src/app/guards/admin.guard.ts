
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier si l'utilisateur est connecté
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // Refuser l'accès aux simples membres
  if (!authService.isAdmin()) {
    return router.createUrlTree(['/home']);
  }

  // Autoriser le pasteur
  return true;
};
