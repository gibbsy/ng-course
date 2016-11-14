import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../';
import { RecipeService } from '../';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
	
	constructor(private recipeService: RecipeService) {};

	recipes = this.recipeService.getRecipes();
	

 	ngOnInit() {
  	
  	}

  	onSelected(recipe: Recipe) {
		
	}

}
