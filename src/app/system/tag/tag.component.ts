import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Routine, Project, TagEnum, One, User } from 'src/app/shared';
import { BaseTag } from 'src/app/shared/models/tags/base-tag.model';
import { ModalRoutineComponent } from '../modal-routine/modal-routine.component';
import { ModalTagComponent } from '../modal-tag/modal-tag.component';
import { ProjectService } from '../services/project.service';
import { OneTagModalComponent } from '../tag-modals/one-tag-modal/one-tag-modal.component';
import { ThreeTagModalComponent } from '../tag-modals/three-tag-modal/three-tag-modal.component';
import { TwoTagModalComponent } from '../tag-modals/two-tag-modal/two-tag-modal.component';

const LS_CHAVE: string = "userSession";

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

  idMin!: Number
  idMax!: Number
  nomeFilter!: string
  positionFilter!: number
  filterArray: boolean[] = []
  shownUsers: number = 0

  loggedUser: User = JSON.parse(localStorage[LS_CHAVE])

  constructor(private projectService: ProjectService, public router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fillTags();
    this.fillListOfTagName();
    console.log(this.project)
    console.log(this.routines)
    console.log(this.routine)
    console.log(this.tags)
  }

  name: string[] = []
  qnt: number[] = []
  filter() {
    this.name = []
    this.qnt = []
    let tem
    for (let tag of this. tags) {
      tem = false
      for(let i = 0; i < this.name.length; i++) {
        if(tag.registerName==this.name[i]) {
          this.qnt[i] += 1 
          tem = true
          break
        }
      }
      if(!tem) {
        this.name.push(tag.registerName!)
        this.qnt.push(1)
      }
    }
    console.log(this.name)
    console.log(this.qnt)
    /*
    this.filterArray = []
    for (let tag of this.tags) {
      console.log("out")
      console.log(tag)
      console.log(this.nomeFilter)
      console.log("idMax:"+this.idMax + " . idMin:" + this.idMin + " . userId:" + tag.line)
      //console.log("in")
      if (tag.nome?.includes(this.nomeFilter) || this.nomeFilter == null) {
        if(tag.position==this.positionFilter || this.positionFilter == null) {
          if ((tag.line! <= this.idMax && tag.line! >= this.idMin) || this.idMax==null || this.idMin==null) {
            console.log("forthIf")
            //console.log(user)
            this.filterArray.push(true)
            continue
          }
        }
      }
      this.filterArray.push(false)
    }
    console.log(this.filterArray)
    this.shownUsers = this.filterArray.filter(Boolean).length
    */
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
    this.filterArray = new Array(this.tags.length).fill(true)
    this.shownUsers = this.filterArray.filter(Boolean).length
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
      next: (data) => {
        //this.mappings[mapping.line!] = mapping,
        this.fillTags()
      },
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
    if (true) {
      this.selectedTag="OneTag"
      const modalRef = this.modalService.open(this.getTagName(this.selectedTag))
      //let modalRef = this.modalService.open(null)
      //eval("modalRef = this.modalService.open(" + this.selectedTag + "Component)")
      modalRef.componentInstance.selectedTag = this.selectedTag
      modalRef.componentInstance.tags = this.tags
      modalRef.componentInstance.routine = this.routine
      modalRef.componentInstance.routines = this.routines
      modalRef.componentInstance.project = this.project
      
      modalRef.componentInstance.filterArray = this.filterArray
      modalRef.componentInstance.shownUsers = this.shownUsers
      modalRef.result.then(
        (result) => {

          console.log(this.filterArray)
          this.shownUsers = this.filterArray.filter(Boolean).length
          console.log(this.shownUsers)
          //console.log(this.projects);
          //console.log(this.filterArray);
          //console.log(this.shownUsers);
        },
        (reason) => {
          //console.log(`Dismissed`);
        }
      );
    } else {
      alert("Choose a Tag Type")
    }
  }



  getTagName(tagName: string): any{ //@Todo: Make it better or at least group some functions to override
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