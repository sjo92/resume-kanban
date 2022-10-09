import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { Job } from '../model/job';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private subject = new Subject<any>();

  private itemValue = new Subject<any>();

  constructor(private afs: AngularFirestore) {}

  
  postJob(data: any): Promise<any> {
    let createdID = data.internal_id? data.internal_id:this.IDgenerator(data.job_title)
    console.log("Data: ",data, "Id:", createdID)
    return this.afs.collection('jobs').doc(createdID).set({
      internal_id: createdID,
      company: data.company,
      job_title: data.job_title,
      status: data.status,
      headhunter: data.headhunter,
      contact_person: data.contact_person,
      contact_email: data.contact_email,
      url: data.url,
      createdAt: serverTimestamp(),
      job_description: data.job_description,
      salary: data.salary,
      note: data.note,
      board: data.board
    });
  }

  getJobs(): Observable<Job[]> {
    return this.afs
      .collection<Job>('jobs')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data() as Job;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        })
      );
  }

  getJobById(id:any): Observable<Job> {
    return this.afs
    .doc<Job>('jobs/' + id)
    .snapshotChanges()
    .pipe(
      map((action) => {
        const data = action.payload.data() as Job;
        const _id = action.payload.id;
        return { _id, ...data };
      })
    );
  }

  deleteJobById(id:any): void {
    this.afs.collection('jobs').doc(id).delete();
  }

  deleteJob(board: any, id:any): Observable<any[]> {
    return this.afs
    .collection('jobs', (ref) =>
      ref.where('board', '==', board)
      .where('internal_id', '==', id)
    )
    .valueChanges();
  }
  IDgenerator(jobtitle: any) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return jobtitle + '_' + Math.random().toString(36).substr(2, 9);
  }
}

function doc(db: any, arg1: string, arg2: string) {
    throw new Error('Function not implemented.');
}
