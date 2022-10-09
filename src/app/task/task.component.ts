import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../model/job';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() job: Job | null = null;
  @Output() edit = new EventEmitter<Job>();
  constructor() { }

  ngOnInit(): void {
  }

}
