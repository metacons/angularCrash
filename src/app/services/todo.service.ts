import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Todo} from "../models/Todo";
import {Observable} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})



export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  limit = '?_limit=5';


  constructor(private http:HttpClient) { }

  getTodoURL() : Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosUrl}${this.limit}`);

  }

  deleteTodo(todo: Todo) : Observable<Todo> {
    const delURL=`${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(delURL, httpOptions);
  }

  //Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const putURL=`${this.todosUrl}/${todo.id}`;
    return this.http.put(putURL, todo, httpOptions);
  }
  getTodosStatic(){
    return [
      {
        id:1,
        title:'Todo One A',
        completed: false
      },
      {
        id:2,
        title:'Todo Two',
        completed: true
      },
      {
        id:3,
        title:'Todo Three',
        completed: false
      },
    ]
  }

  //Add todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
