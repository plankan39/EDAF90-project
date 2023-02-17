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
  userId: string = "";

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid;

        const col = collection(this.firestore, "users", user.uid, "recipes");
        collectionData(query(col), {
          idField: "id",
        }).subscribe((recipes) => (this.recipes = recipes));
      }
    });
  }
}
