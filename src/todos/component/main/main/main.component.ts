import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { TodosService } from 'src/todos/services/todos.service';
import { FilterEnum } from 'src/todos/types/filter.enum';
import { todos } from 'src/todos/types/todos.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos!: Observable<todos[]>;
  todoClass: Observable<boolean>;
  toggleAll!: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    this.toggleAll =  this.todosService.todos.pipe(map(todos => todos.every(todo => todo.completed)))
    this.todoClass = this.todosService.todos.pipe(map(todos => todos.length === 0));

    this.visibleTodos = combineLatest(
      this.todosService.todos,
      this.todosService.filter,
    ).pipe(map(([todos, filter]: [todos[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter(todo => !todo.completed)
      } else if(filter === FilterEnum.completed) {
        return todos.filter(todo => todo.completed)
      }
      return todos;
    }))
   }

   changeToggle($event: Event): void {
    const target = event?.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
   }

   setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
  ngOnInit() {
  }

}
