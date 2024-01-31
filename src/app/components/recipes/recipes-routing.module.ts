import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

import { RecipeDetailComponent } from "./../../components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./../../components/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./../../components/recipes/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./../../components/recipes/recipes-resolver.service";
import { RecipesComponent } from "./../../components/recipes/recipes.component";

const routes: Routes = [
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], 
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent }
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}