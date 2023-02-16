import { Component } from "@angular/core";
import { doc, docData, DocumentData, Firestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { getObservable } from "src/app/helpers/observers";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
})
export class RecipeComponent {
  recipe$ = new BehaviorSubject<DocumentData>({});

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) =>
      getObservable(
        docData(doc(this.firestore, "recipes", params.id)),
        this.recipe$
      )
    );
  }
}
