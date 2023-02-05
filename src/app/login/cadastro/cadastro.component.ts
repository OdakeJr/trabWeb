import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared';
import { CadastroService } from '../services/cadastro.service';
import * as PerfilUtil from 'src/app/shared/globals/perfil-util';

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

  constructor(private cadastroService: CadastroService, public router: Router) { }

  ngOnInit(): void {
    this.fillUsers();
    this.newUser = new User()
    this.userFilter = new User()
  }

  fillUsers(): void {
    this.cadastroService.getAllUsers().subscribe({
      next: (data) => {this.users = data; this.usersOriginal = JSON.parse(JSON.stringify(data))},
      error: (err) => console.log(err)
    });
  }

  filter(): void {
    //Implementar filtro
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
    this.cadastroService.addUser(this.formNewCliente.value).subscribe({
      next: (data) => {console.log(data); this.formNewCliente.form.reset(); this.fillUsers()},
      error: (err) => console.log(err)
    });
    this.fillUsers()
  }

  remove(line?: number): void {
    console.log(this.formCliente.value)
    this.cadastroService.remove(this.users[line!]).subscribe({
      next: (data) => {console.log(data); this.formNewCliente.form.reset(); this.fillUsers()},
      error: (err) => console.log(err)
    });
    this.fillUsers()
  }

}
