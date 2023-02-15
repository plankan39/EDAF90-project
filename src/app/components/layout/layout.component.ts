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

  constructor(private auth: AuthService) {
    this.auth.getUser().subscribe((user: User | null) => (this.user = user));
  }
}
