import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Routine, Project } from 'src/app/shared';
import { BaseTag } from 'src/app/shared/models/base-tag.model';
import { ModalRoutineComponent } from '../modal-routine/modal-routine.component';
import { ModalTagComponent } from '../modal-tag/modal-tag.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tags!: BaseTag[]
  routines: Routine[] = []
  routine!: Routine
  project!: Project

  constructor(private projectService: ProjectService, public router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillTags();
  }

  updateProjectLocally() {
    for(let i = 0; i < this.routines.length; i++) {
      if(this.routines[i].line==this.routine.line) {
        this.routines[i] = this.routine
      }
    }
    this.project.routines = this.routines
  }

  updateTagLocally(tag: BaseTag) {
    for(let i = 0; i < this.tags.length; i++) {
      if(this.tags[i].line==tag.line) {
        this.tags[i] = tag
      }
    }
    this.routine.tag = this.tags
  }

  setRetrievedValues(data: Project[]):void {
    this.project = data[0]
    this.routines = data[0].routines!
    this.routine = this.routines[Number(this.activatedRoute.snapshot.paramMap.get('routineLine')!)]!
    this.tags = this.routine.tag!
  }

  fillTags(): void {
    this.projectService.getProjectByLine(this.activatedRoute.snapshot.paramMap.get('line')!).subscribe({
      next: (data) => {
        this.setRetrievedValues(data)
      },
      error: (err) => console.log(err)
    });
  }

  enable(tag: BaseTag):void {
    tag.enabled = true
    this.updateTagLocally(tag)
    this.updateProjectLocally()

    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.tags[tag.line!] = tag,
      error: (err) => console.log(err)
    });
  }

  orderTagsByArrayAsc(): void {
    for(let i = 0; i < this.tags.length; i++) {
      this.tags[i].line = i
    }
  }

  remove(tag: BaseTag): void {
    this.tags.splice(tag.line!, 1)
    this.orderTagsByArrayAsc()
    this.updateProjectLocally()
    
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => 0,//this.mappings[mapping.line!] = mapping,
      error: (err) => console.log(err)
    });
  }

  openModal(tag: BaseTag) {
    const modalRef = this.modalService.open(ModalTagComponent)
    modalRef.componentInstance.tag = tag
    modalRef.componentInstance.tags = this.tags
    modalRef.componentInstance.routine = this.routine
    modalRef.componentInstance.routines = this.routines
    modalRef.componentInstance.project = this.project
  }

  openAddModal() {
    const modalRef = this.modalService.open(ModalTagComponent)
    modalRef.componentInstance.tags = this.tags
    modalRef.componentInstance.routine = this.routine
    modalRef.componentInstance.routines = this.routines
    modalRef.componentInstance.project = this.project
  }
}