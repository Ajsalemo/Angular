import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../../services/todo.service';
import { AuthService } from '../../../../services/auth.service';

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
  @Input() currentUser: string;
  @Input() todos: any[] = [];
  addTodoView: boolean = false;
  isLoading: boolean = false;
  todoErrorMessage: string = '';
  currentSelectedTodoFilter: string = 'Today';
  todoBoolean: boolean = true;
  doneTodosBoolean: boolean = false;

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

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
          // Set the todo error message field back to empty after the promise completes
          this.todoErrorMessage = '';
          this.todos = res.todos;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    }
  }

  // Toggles the visibility of the 'General' section within the personalization popup menu
  toggleTodoViewState(): void {
    if (this.todoBoolean === true) {
      return;
    }
    this.todoBoolean = !this.todoBoolean;
    this.currentSelectedTodoFilter = 'Today';
    this.doneTodosBoolean = false;
  }

  // Toggles the visibility of the 'Photo' section within the personalization popup menu
  toggleCompletedViewState(): void {
    if (this.doneTodosBoolean === true) {
      return;
    }
    this.doneTodosBoolean = !this.doneTodosBoolean;
    this.currentSelectedTodoFilter = 'Done';
    this.todoBoolean = false;
  }

  // Getter for the todo field
  get todoField() {
    return this.todoGroup.controls;
  }

  conditionalFooterMenuLogin(): void {
    this.authService.logUserIn();
  }

  submitTaskUpdateStatus(completed: any, todoId: string): void {
    this.todoService
      .completeTodo(this.currentUserId, todoId, completed)
      .then(() => {
        this.retrieveAllTodos();
      });
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(this.currentUserId, todoId).then(() => {
      this.retrieveAllTodos();
    });
  }

  submitTodoForm(data: { todo: string }): void {
    this.todoErrorMessage = '';
    let todoValue: string = data.todo;
    this.todoService
      .addTodo(todoValue, this.currentUserId)
      .then(() => {
        this.retrieveAllTodos();
        // Reset the form after a submittion
        this.todoGroup.reset();
      })
      .catch((err) => {
        this.isLoading = false;
        this.todoErrorMessage = err.error.message;
      });
  }
}
