import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Routine } from 'src/app/shared';
import { ModalProjectComponent } from '../modal-project/modal-project.component';
import { ProjectService } from '../services/project.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRoutineComponent } from '../modal-routine/modal-routine.component';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})

export class RoutineComponent implements OnInit {
  routines: Routine[] = []
  project!: Project

  constructor(private projectService: ProjectService, public router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillRoutines();
  }

  updateProjectLocally() {
    //let maps = []
    //for(let i = 0; i < this.mappings.length; i++) {
    //  maps.push(JSON.stringify(this.mappings[i]))
    //}
    this.project.routines = this.routines
  }

  updateRoutineLocally(routine: Routine) {
    for(let i = 0; i < this.routines.length; i++) {
      if(this.routines[i].line==routine.line) {
        this.routines[i] = routine
      }
    }
  }

  fillRoutines(): void {
    this.projectService.getProjectByLine(this.activatedRoute.snapshot.paramMap.get('line')!).subscribe({
      next: (data) => {
        this.project = data[0]
        this.routines = data[0].routines!//this.stringToObj(data.mappings!)
      },
      error: (err) => console.log(err)
    });
  }

  enable(routine: Routine):void {
    routine.enabled = true
    this.updateRoutineLocally(routine)
    this.updateProjectLocally()

    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.routines[routine.line!] = routine,
      error: (err) => console.log(err)
    });
  }

  orderRoutinesByArrayAsc(): void {
    for(let i = 0; i < this.routines.length; i++) {
      this.routines[i].line = i
    }
  }

  remove(routine: Routine): void {
    this.routines.splice(routine.line!, 1)
    this.orderRoutinesByArrayAsc()
    this.updateProjectLocally()
    
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => 0,//this.mappings[mapping.line!] = mapping,
      error: (err) => console.log(err)
    });
  }

  openModal(routine: Routine) {
    const modalRef = this.modalService.open(ModalRoutineComponent)
    modalRef.componentInstance.routine = routine
    modalRef.componentInstance.routines = this.routines
    modalRef.componentInstance.project = this.project
  }

  openAddModal() {
    const modalRef = this.modalService.open(ModalRoutineComponent)
    console.log("Adding")
    modalRef.componentInstance.routines = this.routines
    modalRef.componentInstance.project = this.project
  }
}




/*
export class RoutineComponent implements OnInit {
  projects!: Project[]

  constructor(private projectService: ProjectService, public router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillProjects();
  }

  fillProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => this.projects = data,//; this.ProjectsOriginal = JSON.parse(JSON.stringify(data))},
      error: (err) => console.log(err)
    });
  }

  enable(project: Project):void {
    project.enabled = true
    this.projectService.updateProject(project).subscribe({
      next: (data) => this.projects[project.line!] = project,
      error: (err) => console.log(err)
    });
  }

  remove(project: Project): void {
    this.projectService.remove(project).subscribe({
      next: (data) => this.fillProjects(),
      error: (err) => console.log(err)
    });
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
*/