import { Ingredient } from '../shared';

export class ShoppingListService {
	private items: Ingredient[] = [];

  constructor() { }

  getItems() {
  	return this.items;
  }

  addItem(item: Ingredient) {
    this.items.push(item);
  }

  addItems(items: Ingredient[]) {
  	//Array.prototype.push.apply(this.items, items);
  	this.items.push(...items);
  	// love the spread operator
  }

  editItem(oldItem: Ingredient, newItem: Ingredient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
  

}
