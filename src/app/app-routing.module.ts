import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   {
      path: 'app',
      loadChildren: () => import('./components/private/private.module').then(m => m.PrivateModule),
      canActivate: [AuthGuard]
   },
   {
      path: 'public',
      loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule),
      canActivate: [AuthGuard]
   },
   {
      path: '**',
      // redirectTo: 'app/customers',
      redirectTo: 'public/auth/login',
      pathMatch: 'full'
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
