import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Ingredient } from '../../shared/ingredient'

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew: boolean = true;
  private subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router ) { }

  ngOnInit() {
      this.subscription = this.route.params.subscribe(
         (params: any) => {
            
             if (params.hasOwnProperty('id')) {
                 this.isNew = false;
                 this.recipeIndex = +params['id'];
                 this.recipe = this.recipeService.getRecipe(this.recipeIndex);
             } else {
                 this.isNew = true;
                 this.recipe = null;
             }
             this.initForm();
           }
     );
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addNew(newRecipe);
    } else { 
      this.recipeService.updateRecipe(this.recipe, newRecipe) 
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  onAdd(name: string, quantity: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
            name: new FormControl(name, Validators.required),
            quantity: new FormControl(quantity, Validators.required)
          })
      );

  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private navigateBack() {
    this.router.navigate(['../recipes'])
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      // check that the recipe has ingredients
      if (this.recipe.hasOwnProperty('ingredients')) {
          for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              quantity: new FormControl(this.recipe.ingredients[i].quantity, Validators.required)
            })
          );
        }
      }

      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
        name: [recipeName, Validators.required],
        imagePath: [recipeImageUrl, Validators.required],
        description: [recipeContent, Validators.required],
        ingredients: recipeIngredients
      });
  }

}
