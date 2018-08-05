import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RouterModule} from '@angular/router';
import {RECIPE_ROUTES} from './recipes/recipes.route';

const APP_ROUTES_PROVIDERS = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES},
  {path: 'shopping-list', component: ShoppingListComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);
