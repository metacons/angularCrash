import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Todo} from 'src/app/models/Todo'
import {TodoService} from "../../services/todo.service"


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor(private ts:TodoService) { }

  ngOnInit() {

  }

  //set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete':this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    console.log('toggle');
    //Toggle UI
    todo.completed = !todo.completed;
    //Toggle on Server
    this.ts.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));
  }

  onDelete(todo) {
    console.log('delete');
    this.deleteTodo.emit(todo);
  }
}
