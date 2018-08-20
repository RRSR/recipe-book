import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {

  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private sls: ShoppingListService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = {name: null, amount: null};
    } else {
      this.isAdd = false;
      this.item = changes.item.currentValue;
    }
  }

  onSubmit(ingredient: Ingredient) {
    if (!this.isAdd) {
      this.sls.editItem(this.item, ingredient);
      this.onClear();
      this.isAdd = true;
    } else {
      this.item = new Ingredient(ingredient.name, ingredient.amount);
      this.sls.addItem(this.item);
    }
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
    this.isAdd = true;
  }

  onClear() {
    this.cleared.emit(null);
    this.isAdd = true;
  }
}
