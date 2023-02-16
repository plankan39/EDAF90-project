import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.css"],
})
export class IngredientsComponent {
  ingredients: DocumentData[] = [];
  form: FormGroup;
  currentUpdateIngredient: DocumentData | null = null;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      unit: ["in", [Validators.required]],
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        const col = collection(this.firestore, "ingredients");

        collectionData(query(col, where("userId", "==", user.uid)), {
          idField: "id",
        }).subscribe((ingredients) => (this.ingredients = ingredients));
      }
    });
  }

  setFormValues = (ingredient: DocumentData) => {
    this.currentUpdateIngredient = ingredient;

    this.form.setValue({
      title: ingredient["title"],
      unit: ingredient["unit"],
    });
  };
}
