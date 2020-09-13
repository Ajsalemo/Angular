import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  addTodo(todoName: string, userId: string) {
    return this.http
      .post('/api/addtodo', {
        todoName: todoName,
        userId: userId,
      })
      .toPromise();
  }

  getTodo(userId: string) {
    return this.http.get(`/api/gettodo/${userId}`).toPromise();
  }

  completeTodo(userId: string, todoId: string, completed: boolean) {
    return this.http
      .post('/api/completetodo', {
        userId: userId,
        completed: completed,
        todoId: todoId,
      })
      .toPromise();
  }

  deleteTodo(userId: string, todoId: string) {
    return this.http
      .post('/api/deletetodo', {
        userId: userId,
        todoId: todoId,
      })
      .toPromise();
  }
}
