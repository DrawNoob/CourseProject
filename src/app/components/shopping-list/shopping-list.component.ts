import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    trigger('animationOne', [
      state('normal', style({
          'background-color': 'red',
          transform: 'translateX(0)',
          borderRadius: '50%'
      })),
      state('newState', style({
          'background-color': 'green',
          transform: 'translateX(500px)',
          borderRadius: '0'
      })),
      transition('normal => newState', animate(1000)),
      transition('newState => normal', animate(5000))
    ]),
    // SHOW OBJECT
    trigger('Show', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(500)
      ]),
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy{
    state = 'normal';
    wildState = 'normal';

    firstAnim() {
      this.state = this.state === 'normal' ? 'newState' : 'normal';
    }    

    ingredients: Ingredient [];
    private subscription: Subscription;

    constructor(private slService: ShoppingListService, private http: HttpClient) {

    }



    ngOnInit() {
      this.ingredients = this.slService.getIngredients();
      this.subscription = this.slService.ingredientsChanged
        .subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
          }
      );
    }

    onEditItem(index: number) {
      this.slService.startedEditing.next(index);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}


