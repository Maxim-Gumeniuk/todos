import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from 'src/todos/services/todos.service';
import { FilterEnum } from 'src/todos/types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  todoClass!: Observable<boolean>;
  activeTodo!: Observable<number>;
  itemsLeftText!: Observable<string>;
  filterEnum = FilterEnum;
  filter: Observable<FilterEnum>;

  constructor(private todosService: TodosService) {
    this.todoClass = this.todosService.todos.pipe(map(todos => todos.length === 0));
    this.activeTodo = this.todosService.todos.pipe(map((todos) => todos.filter((item: { completed: boolean; }) => item.completed).length))

    this.itemsLeftText = this.activeTodo.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );

    this.filter = this.todosService.filter;
   }

   changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }


  clearCompletedTodos() {
    this.todosService.clearCompletedTodos();
  }

  ngOnInit() {
  }



}


