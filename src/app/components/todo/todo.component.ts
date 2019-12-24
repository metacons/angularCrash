import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from '../../models/Todo'


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos:Todo[];

  constructor(private ts:TodoService) {

  }

  ngOnInit() {
    //this.todos=this.ts.getTodosStatic();
    this.ts.getTodoURL().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    console.log('delete meee');
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.ts.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.ts.addTodo(todo).subscribe( todo => {
      this.todos.push(todo);
    });
    todo.title = '';
  }
}
