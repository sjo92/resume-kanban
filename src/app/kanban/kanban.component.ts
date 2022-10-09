import { Component } from '@angular/core';
import { Task } from '../task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { JobService } from '../services/job.service';
import { Job } from '../model/job';
import { KanbanService } from '../services/kanban.service';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JobDetailsComponent } from '../job-details/job-details.component';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  constructor(private route: ActivatedRoute,private router: Router , private dialog: MatDialog, private store: AngularFirestore, private jobService: JobService, private kanbanService: KanbanService) {}

  backlog = this.kanbanService.getKanbanBoards('backlog');
  inProgress= this.kanbanService.getKanbanBoards('inprogress')
  done = this.kanbanService.getKanbanBoards('done')

  jobs$!: any;
  selectedId!: any;


  ngOnInit(): void {
    this.backlog = this.kanbanService.getKanbanBoards('backlog')
    this.inProgress = this.kanbanService.getKanbanBoards('inprogress')
    this.done = this.kanbanService.getKanbanBoards('done')
    this.jobs$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('id');
        return this.jobService.getJobById(this.selectedId);
      })
    );
  }

  title = 'resume-kanban';
  
  gotoItems(job: Job) {
    const jobId = job ? job.internal_id : null;
    this.router.navigate(['/jobs/'+jobId]);
  }

  editTask(list: string, job: Job): void {}

  drop(event: any): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.kanbanService.changeItem(event.previousContainer.id,event.container.id, item)

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
