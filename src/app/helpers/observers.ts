import { DocumentData } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";

export const getObservable = (
  observable: Observable<DocumentData | DocumentData[]>,
  subject: BehaviorSubject<DocumentData[] | DocumentData>
) => {
  observable.subscribe((val: DocumentData[] | DocumentData) => {
    subject.next(val);
  });

  return subject;
};
