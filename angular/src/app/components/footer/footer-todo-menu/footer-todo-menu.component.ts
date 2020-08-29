import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../../services/todo.service';

@Component({
  selector: 'component-todo-footer',
  templateUrl: './footer-todo-menu.component.html',
  styleUrls: ['./footer-todo-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ComponentTodoMenuFooter {
  @Input() parentIsTodo: boolean;
  @Input() currentUserId: string;
  addTodoView: boolean = false;

  constructor(private todoService: TodoService) {}

  todoGroup = new FormGroup({
    todo: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  submitTodoForm(data: { todo: string }) {
    const todoValue: string = data.todo;
    console.log(todoValue);
    console.log(this.currentUserId);
    this.todoService
      .addTodo(todoValue, this.currentUserId)
      .then(() => console.log('Added a new task/todo'));
  }
}
