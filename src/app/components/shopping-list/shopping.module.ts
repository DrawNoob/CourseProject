import { NgModule } from "@angular/core";
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListService } from "./shopping-list.service";
import { MapComponent } from './map/map.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        MapComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent },
        ]),
        SharedModule
    ],
    providers: [ShoppingListService]
})
export class ShoppingModule {}