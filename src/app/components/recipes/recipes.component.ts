import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent {
  recipes: DocumentData[] = [];

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        const col = collection(this.firestore, "recipes");
        collectionData(query(col, where("userId", "==", user.uid)), {
          idField: "id",
        }).subscribe((recipes) => (this.recipes = recipes));
      }
    });
  }
}
