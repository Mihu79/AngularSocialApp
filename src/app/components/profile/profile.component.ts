import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  username: string = '';
  password: string = '';
  isLoginMode: boolean = true; // Toggle between login and register
  loginError: string = '';

  constructor(private userService: UserService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginError = '';
  }

  register() {
    if (this.username && this.password) {
      const newUser: User = {
        id: Date.now(),
        username: this.username,
        password: this.password,
      };
      this.userService.register(newUser);
      this.username = '';
      this.password = '';
      alert('Registration successful! You can now log in.');
      this.isLoginMode = true;
    } else {
      alert('Please enter a valid username and password.');
    }
  }

  login() {
    const success = this.userService.login(this.username, this.password);
    if (success) {
      this.username = '';
      this.password = '';
      alert('Login successful!');
    } else {
      this.loginError = 'Invalid username or password.';
    }
  }

  logout() {
    this.userService.logout();
    alert('Logged out successfully.');
  }

  get currentUser() {
    return this.userService.getCurrentUser();
  }

  // Check if user is logged in
  get isLoggedIn() {
    return this.userService.getCurrentUser() !== null;
  }
}
