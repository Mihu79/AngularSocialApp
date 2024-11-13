import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  currentUser: User | null = null;
  commentText: string = '';
  showComments: { [postId: number]: boolean } = {};

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    // Load the current user
    this.currentUser = this.userService.getCurrentUser();
    
    if (this.currentUser) {
      // Load posts filtered by current user's ID
      this.loadPosts();
    }
  }

  loadPosts() {
    if (this.currentUser) {
      // Get posts for the current user
      this.posts = this.postService.getPosts(this.currentUser.id);
    }
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId);
      this.loadPosts(); // Refresh the posts after deletion
    }
  }

  toggleComments(postId: number) {
    this.showComments[postId] = !this.showComments[postId];
  }

  addComment(postId: number) {
    if (this.commentText && this.currentUser) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push({
          userId: this.currentUser.id,
          text: this.commentText,
          username: this.currentUser.username,
        });
        this.commentText = ''; // Clear the input
        localStorage.setItem('posts', JSON.stringify(this.posts)); // Save to localStorage
      }
    }
  }

  likePost(postId: number) {
    if (this.currentUser) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        const userId = this.currentUser.id;

        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter(id => id !== userId);
        } else {
          post.likes.push(userId);
        }

        localStorage.setItem('posts', JSON.stringify(this.posts)); // Save to localStorage
      }
    }
  }

  togglePostPrivacy(postId: number): void {
    if (this.currentUser) {
      this.postService.togglePrivacy(postId, this.currentUser.id); // Toggle privacy
      this.loadPosts(); // Refresh the posts after privacy toggle
    }
  }
}
