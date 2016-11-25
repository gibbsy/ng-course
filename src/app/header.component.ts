import { Component } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onSave() {
      this.recipeService.storeData().subscribe(
          data => console.log(data),
          error => console.error(error)
          );
  }

  onFetch() {
      this.recipeService.fetchData();
  }


}
