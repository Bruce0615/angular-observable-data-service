import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

export interface ToDo {
  id?: any;
  createdAt: number;
  value: string;
}

@Injectable()
export class ToDoService {
  private todoSubject = new BehaviorSubject<ToDo[]>([]);
  private dataStore: { todos: ToDo[] } = { todos: [] };

  public readonly todo$ = this.todoSubject.asObservable();

  private baseUrl = "https://56e05c3213da80110013eba3.mockapi.io/api";

  constructor(private http: HttpClient) {}

  public get todoValue(): ToDo[] {
    return this.todoSubject.value;
  }

  loadAll() {
    this.http.get<ToDo[]>(`${this.baseUrl}/todos`).subscribe(
      data => {
        this.dataStore.todos = data;
        this.todoSubject.next(Object.assign({}, this.dataStore).todos);
      },
      error => {
        console.log("Could not load todos.");
      }
    );
  }

  load(id: number | string) {
    this.http.get<ToDo>(`${this.baseUrl}/todos/${id}`).subscribe(
      data => {
        let notFound = true;

        this.dataStore.todos.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.todos[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          this.dataStore.todos.push(data);
        }

        this.todoSubject.next(Object.assign({}, this.dataStore).todos);
      },

      error => {
        console.log("Could not load todo");
      }
    );
  }

  create(todo: ToDo) {
    this.http
      .post<ToDo>(`${this.baseUrl}/todos`, JSON.stringify(todo))
      .subscribe(
        data => {
          this.dataStore.todos.push(data);
          this.todoSubject.next(Object.assign({}, this.dataStore).todos);
        },
        error => {
          console.log("Could not create todo.");
        }
      );
  }

  update(todo: ToDo) {
    this.http
      .put<ToDo>(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo))
      .subscribe(
        data => {
          this.dataStore.todos.forEach((item, index) => {
            if (item.id === data.id) {
              this.dataStore[index] = data;
            }
          });
          this.todoSubject.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log("Could not update todo.")
      );
  }

  remove(todoId: number | string) {
    this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(
      response => {
        this.dataStore.todos.forEach((item, index) => {
          if (item.id === todoId) {
            this.dataStore.todos.splice(index, 1);
          }
        });
        this.todoSubject.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log("Could not delete todo.")
    );
  }
}
