import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo/todo.component";
import { ToDoService } from "./to-do.service";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent, TodoComponent],
  bootstrap: [AppComponent],
  providers: [ToDoService]
})
export class AppModule {}
