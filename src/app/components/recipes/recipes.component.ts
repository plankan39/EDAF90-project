import { Component } from "@angular/core";
import {
  collection,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { getObservable } from "src/app/helpers/observers";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent {
  recipes$ = new BehaviorSubject<DocumentData[]>([]);

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        const col = collection(this.firestore, "recipes");
        getObservable(
          query(col, where("userId", "==", user.uid)),
          this.recipes$
        );
      }
    });
  }
}
