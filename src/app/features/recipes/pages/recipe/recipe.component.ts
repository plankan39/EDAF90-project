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
  where,
  documentId,
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
})
export class RecipeComponent {
  recipe: DocumentData = {};
  user: User | null = null;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private auth: AuthService
  ) {
    this.auth.getUser().subscribe((user) => (this.user = user));

    this.route.params.subscribe((params: any) => {
      const { userId, recipeId } = params;

      docData(doc(this.firestore, "users", userId, "recipes", recipeId), {
        idField: "id",
      }).subscribe((recipe) => {
        if (!recipe) return;

        this.recipe = { ...recipe, userId };

        recipe["ingredients"].forEach((ing: any) => {
          docData(ing.ref, { idField: "id" }).subscribe((data) => {
            this.recipe["ingredients"] = this.recipe["ingredients"].map(
              (ingredient: any) =>
                ingredient.ref.id === data["id"]
                  ? { ...ingredient, ...data }
                  : ingredient
            );
          });
        });
      });
    });
  }

  deleteRecipe(id: string) {
    this.recipesService.deleteRecipe(id);
  }
}
