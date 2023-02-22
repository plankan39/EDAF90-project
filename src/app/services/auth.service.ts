import { Injectable } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "@angular/fire/auth";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {}

  getUser(): Observable<User | null> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    });
  }

  async signIn(redirect: any[] = [""]): Promise<boolean> {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(
      ({ user }: UserCredential) => {
        const { uid, displayName, email, photoURL } = user;
        setDoc(doc(this.firestore, "users", uid), {
          displayName,
          email,
          photoURL,
        });
        return this.router.navigate(redirect);
      }
    );
  }

  async signOut(redirect: any[] = ["sign-in"]): Promise<boolean> {
    return signOut(this.auth).then(() => this.router.navigate(redirect));
  }
}
