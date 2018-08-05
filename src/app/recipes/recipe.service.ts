import {Injectable} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('Mini Cheesecakes',
      'It is a great treat for kids.',
      'https://images.media-allrecipes.com/userphotos/720x405/1277450.jpg',
      [new Ingredient('Chesse', 10), new Ingredient('Cake', 1)]),
    new Recipe('Rainbow Citrus Cake',
      'Simply yummy!',
      'https://images.media-allrecipes.com/userphotos/720x405/3565428.jpg',
      [new Ingredient('Lemon', 2), new Ingredient('Pistachios', 10)])
  ];

  constructor() {
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(recipeIndex: number) {
    return this.recipes[recipeIndex];
  }

  deleteRecipe(selectedRecipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(selectedRecipe), 1);
  }
}
