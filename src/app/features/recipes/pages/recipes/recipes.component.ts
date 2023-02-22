import { Component } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  Firestore,
  query,
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent {
  recipes: DocumentData[] = [];
  user: DocumentData = {};
  authUser: User | null = null;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.auth.getUser().subscribe((user) => (this.authUser = user));

    this.route.params.subscribe((params: any) => {
      const { userId } = params;

      if (userId) {
        const col = collection(this.firestore, "users", userId, "recipes");
        collectionData(query(col), {
          idField: "id",
        }).subscribe((recipes) => (this.recipes = recipes));

        docData(doc(this.firestore, "users", userId), {
          idField: "id",
        }).subscribe((user: DocumentData) => (this.user = user));
      }
    });
  }
}
