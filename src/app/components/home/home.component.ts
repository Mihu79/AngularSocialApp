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

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    // Load posts from localStorage if available
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      // If posts are found in localStorage, use them
      this.posts = JSON.parse(storedPosts);
    } else {
      // If no posts in localStorage, load from the service (as fallback)
      this.loadPosts();
    }
  
    // Load the current user
    this.currentUser = this.userService.getCurrentUser();
  }
  

  loadPosts() {
    // Ensure posts have likes, comments and usernames populated
    this.posts = this.postService.getPosts().map(post => {
      // Populate username from the currentUser object based on userId
      const user = this.userService.getUserById(post.userId);
      post.username = user ? user.username : 'Unknown'; // If no user is found, set 'Unknown'
      
      post.likes = post.likes || [];
      post.comments = post.comments || [];
      return post;
    });
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId);
      this.loadPosts();
    }
  }

  addComment(postId: number) {
    if (this.commentText && this.currentUser) {
      // Find the post
      const post = this.posts.find(p => p.id === postId);
      
      if (post) {
        // Add the new comment
        post.comments.push({
          userId: this.currentUser.id,
          text: this.commentText,
          username: this.currentUser.username, // Store the username as well
        });
        this.commentText = ''; // Clear the input
  
        // Save the updated posts in localStorage
        localStorage.setItem('posts', JSON.stringify(this.posts));
      }
    }
  }
  
  likePost(postId: number) {
    if (this.currentUser) {
      // Find the post
      const post = this.posts.find(p => p.id === postId);
      
      if (post) {
        const userId = this.currentUser.id;
  
        // Check if the user already liked the post
        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter((id) => id !== userId);
        } else {
          post.likes.push(userId);
        }
  
        // Save the updated posts in localStorage
        localStorage.setItem('posts', JSON.stringify(this.posts));
      }
    }
  }
  
}
