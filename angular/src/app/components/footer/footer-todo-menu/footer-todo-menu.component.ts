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
  isLoading: boolean = false;
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
      this.isLoading = true;
      this.todoService
        .getTodo(this.currentUserId)
        .then((res: any) => {
          this.todos = res.todos;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    }
  }

  submitTodoForm(data: { todo: string }) {
    let todoValue: string = data.todo;
    this.todoService
      .addTodo(todoValue, this.currentUserId)
      .then(() => {
        this.retrieveAllTodos();
        // Reset the form after a submittion
        this.todoGroup.reset();
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    console.log(this.todos);
  }
}
