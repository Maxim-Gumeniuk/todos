import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodosService } from 'src/todos/services/todos.service';
import { todos } from 'src/todos/types/todos.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  @Input()
  todo!: todos
  @Input('isEditing') isEditingProps: boolean | undefined;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
    string | null
  > = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput') textInput: ElementRef | undefined;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todo.id);
  }

  removeTodo(): void {
    console.log('removeTodo');
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }
  changeTodo(): void {
    console.log('change todo', this.editingText);
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

}
