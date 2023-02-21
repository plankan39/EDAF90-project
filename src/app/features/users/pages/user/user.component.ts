import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  recipes: DocumentData[] = [];

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      const { userId } = params;

      if (userId) {
        const col = collection(this.firestore, "users", userId, "recipes");
        collectionData(query(col), {
          idField: "id",
        }).subscribe((recipes) => (this.recipes = recipes));
      }
    });
  }
}
