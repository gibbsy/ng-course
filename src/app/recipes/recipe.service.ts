import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient } from '../shared'

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe('Fish pie', 'Warms the cockles', 'http://ichef.bbci.co.uk/food/ic/food_16x9_608/recipes/how_to_make_fish_pie_56143_16x9.jpg', [new Ingredient('Spuds', '4-5'),
		new Ingredient('Cream', 'Half a pint')] ),
		new Recipe('Shish Kebab', 'Mmmmmeaty', 'http://andrewzimmern.com/wp-content/uploads/2013/05/Shish-Kebabs.jpg', [new Ingredient('Meat', '500g'),
		new Ingredient('Peppers', '1')] )

	];

  constructor(private http: Http) { }

  getRecipes() {
  	return this.recipes;
  }

  getRecipe(id: number) {
  	return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
  	this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addNew(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers ({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      'https://learningng2-651c0.firebaseio.com/recipes.json', 
      body,
      { headers: headers });

  }

  fetchData() {
    return this.http.get('https://learningng2-651c0.firebaseio.com/recipes.json')
     .map((response: Response) => response.json() )
     .subscribe(
         (data: Recipe[]) => {
           this.recipes = data;
           this.recipesChanged.emit(this.recipes);
         }
       )
  }
}
