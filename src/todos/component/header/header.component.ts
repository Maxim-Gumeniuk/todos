import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/todos/services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  text: string = '';

  constructor(private todoService: TodosService) {

  }

  ngOnInit() {
  }

  handleChangeText(event: Event): void{
    const target = event.target as HTMLInputElement;
    if (target.value.trim().length > 0) {
      this.text = target.value;
    }

    return;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}

