import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}


  // Зберігаємо дані в базі даних
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put('https://angular-course-4776-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
    })
  }

  // Витягуєсо дані з бази даних, --- частина в recipe.service.ts, header.component.ts/html
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
            'https://angular-course-4776-default-rtdb.firebaseio.com/recipes.json', 
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe =>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
          });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    );
  }
}
