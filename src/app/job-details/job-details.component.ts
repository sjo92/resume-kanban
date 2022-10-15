import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs'
import { Job } from '../model/job';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job$!: any;
  jobId: any;
  jobForm = new UntypedFormGroup({
    company: new UntypedFormControl(''),    
    job_title: new UntypedFormControl(''),
    status: new UntypedFormControl(''),
    board: new UntypedFormControl(''),
    headhunter: new UntypedFormControl(''),
    contact_person: new UntypedFormControl(''),
    contact_email: new UntypedFormControl(''),
    url: new UntypedFormControl(''),
    createdAt: new UntypedFormControl(''),
    job_description: new UntypedFormControl(''),
    salary: new UntypedFormControl(''),
    note: new UntypedFormControl(''),
  })

  constructor(private jobService:JobService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal  ) {}
  
  ngOnInit() {
    this.getJob() 
  }
  
  getJob():void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.jobService.getJobById(this.jobId).subscribe(data => {
      if (this.jobForm) {
        this.jobForm.patchValue(
          {
            company: data.company,    
            job_title: data.job_title,
            status: data.status,
            board: data.board,
            headhunter: data.headhunter,
            contact_person: data.contact_person,
            contact_email: data.contact_email,
            url: data.url,
            createdAt: data.createdAt,
            job_description: data.job_description,
            salary: data.salary,
            note: data.note,
          },
          {
            emitEvent: false,
            onlySelf: true,
          }
        )
      }

    })
    
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }


  submit(type: string) {
    if (type==='delete') return this.jobService.deleteJobById(this.jobId)

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

    if (type === 'save'){
      job.internal_id = this.jobId;
    }
    return this.jobService.postJob(job);


  }

}
