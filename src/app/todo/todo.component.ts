import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ToDo, ToDoService } from "../to-do.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todo$: Observable<ToDo[]>;
  singleToDo$: Observable<ToDo>;
  todoForm: FormGroup;

  constructor(
    private todoService: ToDoService,
    private formBuilder: FormBuilder
  ) {
    this.todoForm = this.formBuilder.group({
      todo: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.todo$ = this.todoService.todo$;
    this.singleToDo$ = this.todoService.todo$.pipe(
      map(todos => todos.find(item => item.id === "1"))
    );

    this.todoService.loadAll();
    this.todoService.load(1);
  }

  onSubmit() {
    this.todoService.create({
      value: this.todoForm.controls.todo.value
    } as ToDo);
  }

  deleteTodo(todoId: number) {
    this.todoService.remove(todoId);
  }
}
