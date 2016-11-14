import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared'

@Injectable()
export class RecipeService {
	recipes: Recipe[] = [
		new Recipe('Fish pie', 'Warms the cockles', 'http://ichef.bbci.co.uk/food/ic/food_16x9_608/recipes/how_to_make_fish_pie_56143_16x9.jpg', [new Ingredient('Spuds', '4-5'),
		new Ingredient('Cream', 'Half a pint')] ),
		new Recipe('Shish Kebab', 'Mmmmmeaty', 'http://andrewzimmern.com/wp-content/uploads/2013/05/Shish-Kebabs.jpg', [new Ingredient('Meat', '500g'),
		new Ingredient('Peppers', '1')] )

	];

  constructor() { }

  getRecipes() {
  	return this.recipes;
  }

  getRecipe(id: number) {
  	return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
  	this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

}
