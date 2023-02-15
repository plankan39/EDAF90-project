import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    console.log(this.auth.getUser());
  }

  handleSignOut() {
    this.auth.signOut();
  }
}
