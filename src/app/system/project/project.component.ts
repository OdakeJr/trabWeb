import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared';
import { ModalProjectComponent } from '../modal-project/modal-project.component';
import { ProjectService } from '../services/project.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('formProject') formProject!: NgForm
  @ViewChild('formNewProject') formNewProject!: NgForm

  projects!: Project[]

  constructor(private projectService: ProjectService, public router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillProjects();
    //this.newProject = new Project()
  }

  fillProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => this.projects = data,//; this.ProjectsOriginal = JSON.parse(JSON.stringify(data))},
      error: (err) => console.log(err)
    });
  }

  update(line?: number): void {
    this.projectService.updateProject(this.projects[line!]).subscribe({
      next: (data) => this.fillProjects(),
      error: (err) => console.log(err)
    });
    this.fillProjects()
  }

  clean(): void {
    this.formNewProject.form.reset()
  }

  add():void {
    this.projectService.addProject(this.formNewProject.value).subscribe({
      next: (data) => {console.log(data); this.formNewProject.form.reset(); this.fillProjects()},
      error: (err) => console.log(err)
    });
    this.fillProjects()
  }

  remove(line?: number): void {
    console.log("asdasdasd")
    console.log(this.formProject.value)
    this.projectService.remove(this.projects[line!]).subscribe({
      next: (data) => {console.log(data); this.formNewProject.form.reset(); this.fillProjects()},
      error: (err) => console.log(err)
    });
    this.fillProjects()
  }

  openModal(project: Project) {
    const modalRef = this.modalService.open(ModalProjectComponent)
    modalRef.componentInstance.project = project
  }
}
