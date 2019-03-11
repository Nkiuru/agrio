import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule'},
  { path: 'user/:id', loadChildren: './user/user.module#UserPageModule' },
  { path: 'upload/status', loadChildren: './status-update/status-update.module#StatusUpdatePageModule' },
  { path: 'upload/recipe', loadChildren: './recipe/recipe.module#RecipePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
