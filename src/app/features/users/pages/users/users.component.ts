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
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent {
  users: DocumentData[] = [];

  constructor(private firestore: Firestore) {
    const col = collection(this.firestore, "users");

    collectionData(query(col), {
      idField: "id",
    }).subscribe((users) => {
      Promise.all(
        users.map((user) =>
          getDocs(
            query(collection(this.firestore, "users", user["id"], "recipes"))
          ).then((snap) => ({ ...user, recipeCount: snap.size }))
        )
      ).then((extendedUsers) => (this.users = extendedUsers));
    });
  }
}
