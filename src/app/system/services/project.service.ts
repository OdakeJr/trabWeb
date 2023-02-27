import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, User } from 'src/app/shared';

const BASE_URL: string = 'http://localhost:8080/system/';
//const BASE_URL_JSON: string = 'http://localhost:8080/systemJson/';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  constructor(private http: HttpClient) { }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(BASE_URL)
  }

  public getProjectByLine(line: string): Observable<Project[]> {
    return this.http.get<Project[]>(BASE_URL+line)
  }

  public updateProject(project: Project): Observable<Project> {
    //let projectJson = JSON.stringify(project)
    //console.log(project)
    return this.http.put(`${BASE_URL} + ${project.line}`, project)
  }

  public addProject(project: Project): Observable<Project> {
    //let projectJson = JSON.stringify(project)
    //console.log("Add"+project)
    return this.http.post(`${BASE_URL}`, project)
  }

  public remove(project: Project): Observable<Project> {
    return this.http.delete(`${BASE_URL} + ${project.line}`)
  }
}



/*
export class ProjectService {
  
  constructor(private http: HttpClient) { }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(BASE_URL)
  }

  public getProjectByLine(line: string): Observable<Project[]> {
    return this.http.get<Project[]>(BASE_URL+line)
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put(`${BASE_URL} + ${project.line}`, project)
  }

  public addProject(project: Project): Observable<Project> {
    console.log(project)
    return this.http.post(`${BASE_URL}`, project)
  }

  public remove(project: Project): Observable<Project> {
    return this.http.delete(`${BASE_URL} + ${project.line}`)
  }
}
*/