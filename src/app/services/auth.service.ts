import { Injectable } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  getUser(): Observable<User | null> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    });
  }

  async signIn(redirect: any[] = [""]): Promise<boolean> {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(
      (user: UserCredential) => this.router.navigate(redirect)
    );
  }

  async signOut(redirect: any[] = ["sign-in"]): Promise<boolean> {
    return signOut(this.auth).then(() => this.router.navigate(redirect));
  }
}
