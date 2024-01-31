import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe('Свинина з броколі', 'Відьмак (The Witcher)', './../../../../assets/Witcher Recipe.jpg', [
    //   new Ingredient('Свинина', 250, 'г'),
    //   new Ingredient('Морква', 1, 'шт'),
    //   new Ingredient('Цибуля', 1, 'шт'),
    //   new Ingredient('Броколі', 100, 'г'),
    //   new Ingredient('Перець болгарський червоний', 1, 'шт'),
    //   new Ingredient('Часник, зубчики', 2, 'шт'),
    //   new Ingredient('Паста томатна', 1, 'ст.л'),
    // ]),
    // new Recipe('Спагетті з грибами', 'Супер Маріо (Super Mario Bros)', './../../../../assets/Mario.jpg', [
    //   new Ingredient('Спагетті', 300, 'г'),
    //   new Ingredient('Перець болгарський червоний', 2, 'шт'),
    //   new Ingredient('Гриби', 450, 'г'),
    //   new Ingredient('Часник, зубчики', 2, 'шт'),
    //   new Ingredient('Цибуля', 1, 'шт'),
    //   new Ingredient('Паста томатна', 1, 'ст.л'),
    //   new Ingredient('Сир', 100, 'г'),
    // ])
  ];

  constructor(private slService: ShoppingListService) {}


    // Витягуєсо дані з бази даних
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
