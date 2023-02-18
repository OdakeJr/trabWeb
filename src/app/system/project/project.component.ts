import { Component, OnInit, ViewChild } from '@angular/core';
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
  projects!: Project[]

  idMin!: Number
  idMax!: Number
  nomeFilter!: string

  constructor(private projectService: ProjectService, public router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillProjects();
  }

  filter() {

  }

  fillProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => this.projects = data,//; this.ProjectsOriginal = JSON.parse(JSON.stringify(data))},
      error: (err) => console.log(err)
    });
  }

  enable(project: Project):void {
    let text = "Tem certeza que deseja reabilitar esse projeto?";
    if (confirm(text) == true) {
      project.enabled = true
      this.projectService.updateProject(project).subscribe({
        next: (data) => this.projects[project.line!] = project,
        error: (err) => console.log(err)
      });
    }
  }

  remove(project: Project): void {
    let text = "Tem certeza que deseja deletar esse projeto?";
    if (confirm(text) == true) {
      this.projectService.remove(project).subscribe({
        next: (data) => this.fillProjects(),
        error: (err) => console.log(err)
      });
    }
  }

  openModal(project: Project) {
    const modalRef = this.modalService.open(ModalProjectComponent)
    modalRef.componentInstance.project = project
    modalRef.componentInstance.projects = this.projects
  }

  openAddModal() {
    const modalRef = this.modalService.open(ModalProjectComponent)
    modalRef.componentInstance.projects = this.projects
  }
}
