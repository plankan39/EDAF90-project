import { Component } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  collection,
  collectionData,
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
  user: User | null = null;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });

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
