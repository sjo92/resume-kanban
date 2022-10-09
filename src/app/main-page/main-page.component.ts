import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent, JobDialogResult } from '../job-dialog/job-dialog.component';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private dialog: MatDialog, private store: AngularFirestore, private jobService: JobService) {}
  title = 'resume-kanban';
 
  newTask(): void {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '1000px',
      data: {
        job: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: JobDialogResult|undefined) => {
        if (!result) {
          return;
        }
        if (result.delete) {
         this.store.collection('jobs').doc(result.job.internal_id).delete();
        } else {
          this.jobService.postJob(result.job);
          
      }});
  }

}
