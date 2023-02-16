import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
  serverTimestamp,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  user: User | null = null;

  constructor(private firestore: Firestore, private authService: AuthService) {
    authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  addRecipe() {
    if (!this.user) return;

    addDoc(collection(this.firestore, "recipes"), {
      title: "recipe 1",
      userId: this.user.uid,
      created: serverTimestamp(),
    });
  }
}
