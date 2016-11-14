import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list';
import { RecipeService } from '../../recipes';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
	private subscription: Subscription;
	private recipeIndex: number;
	selectedRecipe: Recipe;

	constructor(private sls: ShoppingListService,
  				private route: ActivatedRoute,
  				private recipeService: RecipeService,
  				private router: Router) { }

  ngOnInit() {
  	this.subscription = this.route.params.subscribe(
  		(params: any) => {
  			this.recipeIndex = params['id'];
  			this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
  			}
  		)
  }

  onEdit() {
  	this.router.navigate(['/recipes', this.recipeIndex, 'edit'])
  }

  onDelete() {
  	this.recipeService.deleteRecipe(this.selectedRecipe);
  }

  onAddToShoppingList() {
  	this.sls.addItems(this.selectedRecipe.ingredients);
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

}
