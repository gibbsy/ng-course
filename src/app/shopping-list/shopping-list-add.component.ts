import { Component, OnChanges, Input , Output, EventEmitter } from '@angular/core';

import { Ingredient } from "../shared/ingredient";
import { ShoppingListService } from "./shopping-list.service"

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
    @Input() item: Ingredient;
    @Output() clearSelected = new EventEmitter();
    isAdd = true;
    multipleItems = false;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
      if (changes.item.currentValue === null ) {
          this.isAdd = true;
          this.item = {name: null, quantity: null}
      } else {
          this.isAdd = false;
      }
      this.multipleItems = this.checkLength();
  }

  onSubmit(ingredient: Ingredient) {
      const newIngredient = new Ingredient (ingredient.name, ingredient.quantity);
      if (!this.isAdd) {
         this.sls.editItem(this.item, newIngredient);
         this.onClearSelected();
      } else {
          this.item = newIngredient;
          this.sls.addItem(this.item);
      }
      this.multipleItems = this.checkLength();
  }

  onDelete() {
      this.sls.deleteItem(this.item);
      this.onClearSelected();
  }

  onClearSelected() {
      this.isAdd = true;
      this.clearSelected.emit(null);
  }

  onDeleteAll() {
      this.onClearSelected();
      this.sls.deleteAll();
      this.multipleItems = this.checkLength();
  }

  checkLength() {
      if (this.sls.getItems().length > 1) {
          return true;
      } 
      return false;
  }

}
