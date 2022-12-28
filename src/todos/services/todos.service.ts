import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { todos } from '../types/todos.interface';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  todos = new BehaviorSubject<todos[]>([]);
  filter = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {

    if (text.trim().length > 0) {
      const newTodo: todos = {
        id: Math.random().toString(16),
        text,
        completed: false,
      }

    const updatedTodos = [...this.todos.getValue(), newTodo];
    this.todos.next(updatedTodos);
    }

    return;

  }

  toggleAll(completed: boolean): void {
    const updatedTodo = this.todos.getValue().map((todo) => {
      return {
        ...todo,
        completed
      }
    });

    this.todos.next(updatedTodo);
  }

  changeTodo(id: string, text: string): void {
    if (text.trim().length > 0) {
      const updatedTodos = this.todos.getValue().map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text,
          };
        }

        return todo;
      });
      this.todos.next(updatedTodos);
    }

    return;
  }


  removeTodo(id: string): void {
    const updatedTodos = this.todos
      .getValue()
      .filter((todo) => todo.id !== id);

    this.todos.next(updatedTodos);
  }


  toggleTodo(id: string): void {
    const updatedTodos = this.todos.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    this.todos.next(updatedTodos);
  }


  changeFilter(filterName: FilterEnum): void {
    this.filter.next(filterName);
  }

  clearCompletedTodos() {
    const clearTodo = this.todos.getValue().filter(todo => !todo.completed);
    this.todos.next(clearTodo);
  }

constructor() { }

}
