import { collectionData, DocumentData, Query } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";

export const getObservable = (
  query: Query<DocumentData>,
  subject: BehaviorSubject<DocumentData[]>
) => {
  collectionData(query, {
    idField: "id",
  }).subscribe((val: DocumentData[]) => {
    subject.next(val);
  });

  return subject;
};
