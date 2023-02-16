import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sign-in",
  host: {
    class: "h-full w-full block flex items-center justify-center",
  },
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  handleClick() {
    this.authService.signIn([""]);
  }
}
