import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mapping, Project } from 'src/app/shared';
//import { ModalMappingComponent } from '../modal-mapping/modal-mapping.component';
import { MappingService } from '../services/mapping.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMappingComponent } from '../modal-mapping/modal-mapping.component';
import { ProjectService } from '../services/project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})

export class MappingComponent implements OnInit {
  @ViewChild('formFilter') formFilter!: NgForm
  mappings: Mapping[] = []
  project!: Project

  mappingsFiltered: Mapping[] = []
  mappingFilter!: Mapping
  idMin!: Number
  idMax!: Number

  constructor(private projectService: ProjectService, public router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillMappings();
    this.mappingFilter = new Mapping()
  }

  /*
  stringToObj(mapping: string[]): Mapping[] {
    let maps = []
    if(mapping!=null) {
      for(let i = 0; i < mapping.length; i++) {
        maps.push(JSON.parse(mapping[i]))
      } 
    }
    return maps
  }
  */

  updateProjectLocally() {
    //let maps = []
    //for(let i = 0; i < this.mappings.length; i++) {
    //  maps.push(JSON.stringify(this.mappings[i]))
    //}
    this.project.mappings = this.mappings
  }

  updateMapLocally(mapping: Mapping) {
    for(let i = 0; i < this.mappings.length; i++) {
      if(this.mappings[i].line==mapping.line) {
        this.mappings[i] = mapping
      }
    }
  }

  fillMappings(): void {
    this.projectService.getProjectByLine(this.activatedRoute.snapshot.paramMap.get('line')!).subscribe({
      next: (data) => {
        this.project = data[0]
        if(data[0].mappings!=null) {
          this.mappings = data[0].mappings//this.stringToObj(data.mappings!)
        }
      },
      error: (err) => console.log(err)
    });
  }

  filter():void {

  }

  enable(mapping: Mapping):void {
    mapping.enabled = true
    this.updateMapLocally(mapping)
    this.updateProjectLocally()

    this.projectService.updateProject(this.project).subscribe({
      next: (data) => this.mappings[mapping.line!] = mapping,
      error: (err) => console.log(err)
    });
  }

  orderMappingsByArrayAsc(): void {
    for(let i = 0; i < this.mappings.length; i++) {
      this.mappings[i].line = i
    }
  }

  //someArray.splice(x, 1);
  remove(mapping: Mapping): void {
    this.mappings.splice(mapping.line!, 1)
    this.orderMappingsByArrayAsc()
    this.updateProjectLocally()
    
    this.projectService.updateProject(this.project).subscribe({
      next: (data) => 0,//this.mappings[mapping.line!] = mapping,
      error: (err) => console.log(err)
    });
  }

  openModal(mapping: Mapping) {
    const modalRef = this.modalService.open(ModalMappingComponent)
    modalRef.componentInstance.mapping = mapping
    modalRef.componentInstance.mappings = this.mappings
    modalRef.componentInstance.project = this.project
  }

  openAddModal() {
    console.log(this.mappings)
    console.log(this.project)
    const modalRef = this.modalService.open(ModalMappingComponent)
    modalRef.componentInstance.mappings = this.mappings
    modalRef.componentInstance.project = this.project
  }
}






/*
export class MappingComponent implements OnInit {
  mappings!: Mapping[]

  constructor(private mappingService: MappingService, public router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillmappings();
  }

  fillmappings(): void {
    this.mappingService.getAllMappings().subscribe({
      next: (data) => this.mappings = data,//; this.mappingsOriginal = JSON.parse(JSON.stringify(data))},
      error: (err) => console.log(err)
    });
  }

  enable(mapping: Mapping):void {
    mapping.enabled = true
    this.mappingService.updateMapping(mapping).subscribe({
      next: (data) => this.mappings[mapping.line!] = mapping,
      error: (err) => console.log(err)
    });
  }

  remove(mapping: Mapping): void {
    this.mappingService.remove(mapping).subscribe({
      next: (data) => this.fillmappings(),
      error: (err) => console.log(err)
    });
  }

  openModal(mapping: Mapping) {
    const modalRef = this.modalService.open(ModalMappingComponent)
    modalRef.componentInstance.mapping = mapping
    modalRef.componentInstance.mappings = this.mappings
  }

  openAddModal() {
    const modalRef = this.modalService.open(ModalMappingComponent)
    modalRef.componentInstance.mappings = this.mappings
  }
}
*/