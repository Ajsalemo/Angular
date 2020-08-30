import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
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
export class ComponentTodoMenuFooter implements OnInit {
  @Input() parentIsTodo: boolean;
  @Input() currentUserId: string;
  addTodoView: boolean = false;
  todos: any[] = [];

  constructor(private todoService: TodoService) {}

  todoGroup = new FormGroup({
    todo: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  retrieveAllTodos(): void {
    if (this.currentUserId !== '' && this.currentUserId) {
      this.todoService.getTodo(this.currentUserId).then((res: any) => {
        this.todos = res.todos;
      });
    }
  }

  submitTodoForm(data: { todo: string }) {
    const todoValue: string = data.todo;
    this.todoService.addTodo(todoValue, this.currentUserId).then(() => {
      console.log('Added a task/todo');
      this.retrieveAllTodos();
    });
  }

  ngOnInit(): void {
    console.log(this.todos)
  }
}
