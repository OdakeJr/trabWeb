import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MappingComponent } from './mapping/mapping.component';
import { RoutineComponent } from './routine/routine.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalProjectComponent } from './modal-project/modal-project.component';
import { ProjectFolderComponent } from './project-folder/project-folder.component';



@NgModule({
  declarations: [
    MappingComponent,
    RoutineComponent,
    ProjectComponent,
    ModalProjectComponent,
    ProjectFolderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SystemModule { }
