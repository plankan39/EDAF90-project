import { Component } from "@angular/core";
import { User } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  user: User | null = null;

  constructor(private auth: AuthService) {
    this.auth.getUser().subscribe((user: User | null) => {
      this.user = user;
    });
  }

  handleSignOut(): void {
    this.auth.signOut(["sign-in"]);
  }
}
