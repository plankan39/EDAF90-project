import { Component } from "@angular/core";
import { User } from "@angular/fire/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService
      .getUser()
      .subscribe((user: User | null) => (this.user = user));
  }

  handleSignOut(): void {
    this.authService.signOut(["sign-in"]);
  }
}
