import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Job } from '../model/job';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css'],
})
export class JobDialogComponent {
  selectedJob!: Job;

  jobForm = new FormGroup({
    company: new FormControl(''),    
    job_title: new FormControl(''),
    status: new FormControl(''),
    board: new FormControl(''),
    headhunter: new FormControl(''),
    contact_person: new FormControl(''),
    contact_email: new FormControl(''),
    url: new FormControl(''),
    createdAt: new FormControl(''),
    job_description: new FormControl(''),
    salary: new FormControl(''),
    note: new FormControl(''),
  })

  private backupTask: Partial<Job> = { ...this.data.job };

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDialogData
  ) {}

  submit() {
    let job = new Job();
    job.company = this.jobForm.get('company')!.value;
    job.job_title = this.jobForm.get('job_title')!.value;
    job.status = this.jobForm.get('status')!.value;
    job.board = this.jobForm.get('board')!.value.length>0? this.jobForm.get('board')!.value: 'backlog';
    job.contact_email = this.jobForm.get('contact_email')!.value;
    job.contact_person = this.jobForm.get('contact_person')!.value;
    job.headhunter = this.jobForm.get('headhunter')!.value;
    job.job_description = this.jobForm.get('job_description')!.value;
    job.note = this.jobForm.get('note')!.value;
    job.salary = this.jobForm.get('salary')!.value;
    job.url = this.jobForm.get('url')!.value;
    console.log(job);
    this.dialogRef.close({ job: job, delete: false }); 
  }
  
  cancel(): void {-
    console.log()
    this.data.job.company = this.backupTask.company;
    this.data.job.job_title = this.backupTask.job_title;
    this.data.job.status = this.backupTask.status;
    this.data.job.board = this.backupTask.board;
    this.data.job.headhunter = this.backupTask.headhunter;
    this.data.job.contact_person = this.backupTask.contact_person;
    this.data.job.contact_email = this.backupTask.contact_email;
    this.data.job.url = this.backupTask.url;
    this.data.job.job_description = this.backupTask.job_description;
    this.data.job.salary = this.backupTask.salary;
    this.data.job.note = this.backupTask.note;
    this.dialogRef.close(this.data);
  }
}
export interface JobDialogData {
  job: Partial<Job>;
  enableDelete: boolean;
}

export interface JobDialogResult {
  job: Job;
  delete?: boolean;
}