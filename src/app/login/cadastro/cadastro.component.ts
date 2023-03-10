import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared';
import { CadastroService } from '../services/cadastro.service';
import * as PerfilUtil from 'src/app/shared/globals/perfil-util';
import { ProjectService } from 'src/app/system/services/project.service';

const LS_CHAVE: string = "userSession";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @ViewChild('formUser') formCliente!: NgForm
  @ViewChild('formNewUser') formNewCliente!: NgForm
  @ViewChild('formFilter') formFilter!: NgForm
  usersOriginal!: User[]
  users: User[] = []
  newUser!: User
  perfils = PerfilUtil.perfils

  usersFiltered: User[] = []
  userFilter!: User
  idMin!: Number
  idMax!: Number
  filterArray: boolean[] = []
  shownUsers: number = 0

  loggedUser: User = JSON.parse(localStorage[LS_CHAVE])

  constructor(private projectService: ProjectService, private cadastroService: CadastroService, public router: Router) { }

  ngOnInit(): void {
    console.log(this.loggedUser)
    this.fillUsers();
    this.newUser = new User()
    this.userFilter = new User()
  }

  fillUsers(): void {
    this.cadastroService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; this.usersOriginal = JSON.parse(JSON.stringify(data))
        this.filterArray = new Array(this.users.length).fill(true)
        this.shownUsers = this.filterArray.filter(Boolean).length
      },
      error: (err) => console.log(err)
    });
  }

  filter(): void {
    //Implementar filtro
    //1) Pegar dados e colocar no userFilter
    //2) create loop with if to check if the user fits in the filter

    this.filterArray = []
    for (let user of this.users) {
      //console.log("out")
      //console.log(user)
      //console.log(this.userFilter)
      //console.log("idMax:"+this.idMax + " . idMin:" + this.idMin + " . userId:" + user.line)
      //console.log("in")
      if (user.nome?.includes(this.userFilter.nome!) || this.userFilter.nome == null) {
        //console.log("firtIf")
        if (String(user.cadastro).includes(String(this.userFilter.cadastro)) || this.userFilter.cadastro == null) {
          //console.log("secIf")
          if (user.perfil==this.userFilter.perfil || this.userFilter.perfil=="" || this.userFilter.perfil==null) {
            //console.log("thirdIf")
            if ((user.line! <= this.idMax && user.line! >= this.idMin) || this.idMax==null || this.idMin==null) {
              //console.log("forthIf")
              //console.log(user)
              this.filterArray.push(true)
              continue
            }
          }
        }
      }
      this.filterArray.push(false)
    }
    //console.log(this.filterArray)
    this.shownUsers = this.filterArray.filter(Boolean).length
  }

  //---------------------------------------

  //@Todo: Login

  //----------------------

  update(line?: number): void {
    this.cadastroService.updateUser(this.users[line!]).subscribe({
      next: (data) => this.fillUsers(),
      error: (err) => console.log(err)
    });
    this.fillUsers()
  }

  cancel(line?: number): void {
    this.users[line!] = JSON.parse(JSON.stringify(this.usersOriginal[line!]))
  }

  clean(): void {
    this.formNewCliente.form.reset()
  }

  add():void {
    console.log(this.formNewCliente.value)
    this.cadastroService.addUser(this.formNewCliente.value).subscribe({
      next: (data) => {
        console.log(data); 
        this.formNewCliente.form.reset(); 
        this.fillUsers()
      },
      error: (err) => console.log(err)
    });
    this.fillUsers()
  }

  remove(line?: number): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        console.log("On remove")
        if(this.pedidoExistNot(data, line)) {
          this.removeFinal(line)
        } else {
          alert("Pedido vinculado ao CPF")
        }
      },
      error: (err) => console.log(err)
    });
  }

  pedidoExistNot(data: any, line?: number): boolean {

    console.log(data[0].routines)
    console.log(data)
    for (let i = 0; i < data[0].routines.length; i++) {
      console.log("rotNome")
      console.log(data[0].routines[i].nome)
      console.log("cadScrit")
      console.log(this.users[line!].cadastro)

      if (data[0].routines[i].nome==this.users[line!].cadastro) {
        console.log("There is")
        return false
      }
    }
    console.log("There is not")
    return true
  }

  removeFinal(line?: number): void {
    console.log(this.formCliente.value)
    this.cadastroService.remove(this.users[line!]).subscribe({
      next: (data) => {console.log(data); this.formNewCliente.form.reset(); this.fillUsers()},
      error: (err) => console.log(err)
    });
    this.fillUsers()
  }


}
