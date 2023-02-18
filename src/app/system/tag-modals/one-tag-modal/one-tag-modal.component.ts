import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseTag, One, Project, Routine } from 'src/app/shared';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-one-tag-modal',
  templateUrl: './one-tag-modal.component.html',
  styleUrls: ['./one-tag-modal.component.css']
})
export class OneTagModalComponent implements OnInit {
  @Input() tag!: One
  @Input() tags!: BaseTag[]
  @Input() routine!: Routine
  @Input() routines!: Routine[]
  @Input() project!: Project
  @Input() selectedTag!: string
  
  tagToUpdate!: One
  newTag!: One
  enableFields!: boolean

  @ViewChild('formTag') formTag!: NgForm
  @ViewChild('formNewTag') formNewTag!: NgForm

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initiateNewTag()
    this.initiateTagToUpdate()
  }

  initiateNewTag(): void {
    this.newTag = new BaseTag()
    this.newTag.nome = this.selectedTag
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

  initiateTagToUpdate():void {
    this.tagToUpdate = new BaseTag()
    this.tagToUpdate = structuredClone(this.tag)
    if(this.tags==null) {
      this.tags = []
    }
    //this.mappingToUpdate = JSON.parse(JSON.stringify(this.mapping))
  }

  update():void {
    let line = this.tag.line
    this.tag = this.formTag.value
    this.tag.enabled = true
    this.tag.line = line
    this.updateTagLocally(this.tag)
    this.updateProjectLocally()

    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.tags[this.tag.line!] = this.tag,
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }
  
  add():void {
    this.newTag = this.formNewTag.value
    this.newTag.enabled = true
    this.newTag.line = this.tags.length
    this.tags.push(this.newTag)
    this.routine.tag = this.tags
    this.updateProjectLocally()
    

    this.projectService.updateProject(this.project).subscribe({
      next: (data) => 0,//this.mappings.push(this.newMapping),
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }

  disable():void {
    this.tag.enabled = false
    this.updateTagLocally(this.tag)
    this.updateProjectLocally()
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.tags[this.tag.line!] = this.tag,
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }
}