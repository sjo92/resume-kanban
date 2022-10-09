import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { Job } from '../model/job';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private subject = new Subject<any>();

  private itemValue = new Subject<any>();

  constructor(private afs: AngularFirestore, private jobService: JobService) {}

  
  getKanbanBoards(board: any): Observable<any[]> {
    return this.afs
    .collection('jobs', (ref) =>
      ref.where('board', '==', board)
    )
    .valueChanges();
  }

  changeItem(prev: any, curr: any, item: any) {
    console.log("Item:",item, "prev:", prev, "curr:", curr)
    item.board = curr
    return  this.afs.collection('jobs').doc(item.internal_id).update({
        board: curr,
      })
  }

}

function doc(db: any, arg1: string, arg2: string) {
    throw new Error('Function not implemented.');
}
