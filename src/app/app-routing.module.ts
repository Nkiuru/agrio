import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'single-post/:postid', loadChildren: './single-post/single-post.module#SinglePostPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule'},
  { path: 'user/:id', loadChildren: './user/user.module#UserPageModule' },
  { path: 'upload/status', loadChildren: './status-update/status-update.module#StatusUpdatePageModule' },
  { path: 'upload/recipe', loadChildren: './recipe/recipe.module#RecipePageModule' },
  { path: 'liked-posts', loadChildren: './liked-posts/liked-posts.module#LikedPostsPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
