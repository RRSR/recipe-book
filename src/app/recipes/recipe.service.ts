import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

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

  constructor(private http: Http) {
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

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const data = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-ccee3.firebaseio.com/recipes.json', data, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipe-book-ccee3.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }

}
