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
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  recipes: DocumentData[] = [];
  user: DocumentData = {};

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
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
