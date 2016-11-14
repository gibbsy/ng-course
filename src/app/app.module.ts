import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { RecipesComponent } from './recipes';
import { RecipeListComponent, RecipeItemComponent } from './recipes/recipe-list';
import { RecipeDetailComponent } from './recipes/recipe-detail';
import { ShoppingListComponent, ShoppingListAddComponent } from './shopping-list/';
import { DropdownDirective } from './dropdown.directive';

import { RecipeService } from './recipes';
import { ShoppingListService } from './shopping-list';

import { AppRouting } from './app.routing';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListAddComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    RecipeService, 
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
