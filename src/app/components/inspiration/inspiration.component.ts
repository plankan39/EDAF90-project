import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  getDocs,
  where,
} from "@angular/fire/firestore";

@Component({
  selector: "app-inspiration",
  templateUrl: "./inspiration.component.html",
  styleUrls: ["./inspiration.component.css"],
})
export class InspirationComponent {
  users: DocumentData[] = [];

  constructor(private firestore: Firestore) {
    const col = collection(this.firestore, "users");

    collectionData(query(col), {
      idField: "id",
    }).subscribe((users) => {
      Promise.all(
        users.map((user) =>
          getDocs(
            query(
              collection(this.firestore, "recipes"),
              where("userId", "==", user["id"])
            )
          ).then((snap) => ({ ...user, recipeCount: snap.size }))
        )
      ).then((extendedUsers) => (this.users = extendedUsers));
    });
  }
}
