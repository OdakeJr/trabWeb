import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MappingComponent } from './mapping/mapping.component';
import { RoutineComponent } from './routine/routine.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalProjectComponent } from './modal-project/modal-project.component';
import { ProjectFolderComponent } from './project-folder/project-folder.component';
import { ModalMappingComponent } from './modal-mapping/modal-mapping.component';
import { ModalRoutineComponent } from './modal-routine/modal-routine.component';
import { TagComponent } from './tag/tag.component';
import { ModalTagComponent } from './modal-tag/modal-tag.component';
import { OneTagModalComponent } from './tag-modals/one-tag-modal/one-tag-modal.component';
import { TwoTagModalComponent } from './tag-modals/two-tag-modal/two-tag-modal.component';
import { ThreeTagModalComponent } from './tag-modals/three-tag-modal/three-tag-modal.component';



@NgModule({
  declarations: [
    MappingComponent,
    RoutineComponent,
    ProjectComponent,
    ModalProjectComponent,
    ProjectFolderComponent,
    ModalMappingComponent,
    ModalRoutineComponent,
    TagComponent,
    ModalTagComponent,
    OneTagModalComponent,
    TwoTagModalComponent,
    ThreeTagModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SystemModule { }
