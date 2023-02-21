import { Component, Input } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";

@Component({
  selector: "app-recipes-table",
  templateUrl: "./recipes-table.component.html",
  styleUrls: ["./recipes-table.component.css"],
})
export class RecipesTableComponent {
  @Input() recipes!: DocumentData[];
  @Input() userId!: string | undefined;
}
