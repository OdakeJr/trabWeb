import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/shared';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.css']
})
export class ModalProjectComponent implements OnInit {
  @Input() project!: Project
  @Input() projects!: Project[]
  
  projectToUpdate!: Project
  newProject!: Project

  @ViewChild('formProject') formProject!: NgForm
  @ViewChild('formNewProject') formNewProject!: NgForm

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.newProject = new Project()
    this.initiateProjectToUpdate()
  }

  initiateProjectToUpdate():void {
    this.projectToUpdate = new Project()
    this.projectToUpdate = structuredClone(this.project)
    //this.projectToUpdate = JSON.parse(JSON.stringify(this.project))
  }

  update():void {
    this.project = this.formProject.value
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.projects[this.project.line!] = this.project,
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }
  
  add():void {
    this.newProject = this.formNewProject.value
    this.newProject.enabled = true
    this.projectService.addProject(this.newProject).subscribe({
      next: (data) => this.projects.push(this.newProject),
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }

  disable():void {
    this.project.enabled = false
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.projects[this.project.line!] = this.project,
      error: (err) => console.log(err)
    });
    this.activeModal.close()
  }
}
