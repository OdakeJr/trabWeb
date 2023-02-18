import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Routine, Project, TagEnum, One } from 'src/app/shared';
import { BaseTag } from 'src/app/shared/models/tags/base-tag.model';
import { ModalRoutineComponent } from '../modal-routine/modal-routine.component';
import { ModalTagComponent } from '../modal-tag/modal-tag.component';
import { ProjectService } from '../services/project.service';
import { OneTagModalComponent } from '../tag-modals/one-tag-modal/one-tag-modal.component';
import { ThreeTagModalComponent } from '../tag-modals/three-tag-modal/three-tag-modal.component';
import { TwoTagModalComponent } from '../tag-modals/two-tag-modal/two-tag-modal.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  selectedTag: string = ""
  listOfTagName: string[] = []
  tags: BaseTag[] = []
  routines: Routine[] = []
  routine!: Routine
  project!: Project

  constructor(private projectService: ProjectService, public router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillTags();
    this.fillListOfTagName();
    console.log(this.project)
    console.log(this.routines)
    console.log(this.routine)
    console.log(this.tags)
  }

  fillListOfTagName(): void {
    for (const value in TagEnum) {
      console.log(value)
      this.listOfTagName.push(value)
    }
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
    if(this.routine.tag!=null) {
      this.tags = this.routine.tag
    }
  }

  fillTags(): void {
    this.projectService.getProjectByLine(this.activatedRoute.snapshot.paramMap.get('line')!).subscribe({
      next: (data) => {
        console.log(data)
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

  /*
  for (const value in TagEnum) {
      this.listOfTagName.push(value)
    }
  */

  openModal(tag: BaseTag) {
    const modalRef = this.modalService.open(this.getTagName(tag.nome!))
    //let modalRef
    //eval("modalRef = this.modalService.open(" + tag.nome + "Component)")
    //eval("modalRef = this.modalService.open(ModalTagComponent)")
    modalRef.componentInstance.tag = tag
    modalRef.componentInstance.tags = this.tags
    modalRef.componentInstance.routine = this.routine
    modalRef.componentInstance.routines = this.routines
    modalRef.componentInstance.project = this.project
  }

  openAddModal() {
    if (this.selectedTag!="") {
      const modalRef = this.modalService.open(this.getTagName(this.selectedTag))
      //let modalRef = this.modalService.open(null)
      //eval("modalRef = this.modalService.open(" + this.selectedTag + "Component)")
      modalRef.componentInstance.selectedTag = this.selectedTag
      modalRef.componentInstance.tags = this.tags
      modalRef.componentInstance.routine = this.routine
      modalRef.componentInstance.routines = this.routines
      modalRef.componentInstance.project = this.project
    } else {
      alert("Choose a Tag Type")
    }
  }



  getTagName(tagName: string): any{
    switch (tagName) {
      case "OneTag":
        return OneTagModalComponent
      case "TwoTag":
          return TwoTagModalComponent
      case "ThreeTag":
          return ThreeTagModalComponent
    }
    return ModalTagComponent
  }
}