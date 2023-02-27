import { Component } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  Firestore,
  limit,
  orderBy,
  query,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  recipes: DocumentData[] = [];
  user: User | null = null;
  ingredients: any[] = [];
  loadingRecipes: boolean = true;

  constructor(private firestore: Firestore, private auth: AuthService) {
    this.auth.getUser().subscribe((user) => {
      this.user = user;

      if (user) {
        const col = collection(this.firestore, "users", user.uid, "recipes");
        collectionData(query(col), {
          idField: "id",
        }).subscribe((recipes) => {
          this.recipes = recipes;
          this.loadingRecipes = false;
        });
      }
    });

    const col = collection(this.firestore, "ingredients");

    collectionData(query(col, orderBy("created", "desc"), limit(10)), {
      idField: "id",
    }).subscribe((ingredients) => (this.ingredients = ingredients));
  }
}
