import { Component, Input } from '@angular/core';

import { Recipe } from '../';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
	@Input() recipe: Recipe;
	@Input() recipeId: number;

}
