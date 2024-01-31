import { transition, trigger, state, style,animate } from '@angular/animations';
import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  // ANIMATION OF ELEMENT SHOW
  animations: [
    trigger('Show', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // Show
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
export class RecipeItemComponent {

  @Input('recipeData') recipe: Recipe;
  @Input() index: number;

}
