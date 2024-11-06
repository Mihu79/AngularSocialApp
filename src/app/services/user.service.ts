import { Injectable } from '@angular/core';

export interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor() {}

  // Register a new user
  register(user: User): void {
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(users));
  }

  // Login a user
  login(username: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Retrieve the currently logged-in user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Logout the current user
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Helper method to get all registered users
  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.USER_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // New method to get a user by their ID
  getUserById(userId: number): User | undefined {
    const users = this.getAllUsers();
    return users.find(user => user.id === userId); // Find and return the user with the matching ID
  }
}
