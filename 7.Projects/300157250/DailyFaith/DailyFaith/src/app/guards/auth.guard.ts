
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier si l'utilisateur est connecté
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // Rediriger le pasteur vers son espace
  if (authService.isAdmin()) {
    return router.createUrlTree(['/admin']);
  }

  return true;
};
