import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from '../component/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../component/header/header.component';
import { TodosService } from '../services/todos.service';
import { MainComponent } from '../component/main/main/main.component';
import { TodoComponent } from '../component/todo/todo/todo.component';
import { FooterComponent } from '../component/footer/footer/footer.component';

const routes: Routes = [
  {
  path: '',
  component: TodosComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TodosComponent
  ],
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoComponent,
    FooterComponent
  ],
  providers: [TodosService]
})
export class TodosModule { }
