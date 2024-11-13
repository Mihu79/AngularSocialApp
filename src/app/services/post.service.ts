import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  userId: number;
  imageUrl: string;
  caption: string;
  private: boolean; // Privacy flag
  likes: number[];
  comments: { username: string; userId: number; text: string }[];
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly POST_KEY = 'posts';

  constructor() {}

  // Retrieve posts, showing private posts only to the creator
  getPosts(currentUserId: number): Post[] {
    const postsJson = localStorage.getItem(this.POST_KEY);
    let posts: Post[] = postsJson ? JSON.parse(postsJson) : [];

    // Show private posts only to the creator and all public posts
    return posts.filter(post => !post.private || post.userId === currentUserId);
  }

  // Add a new post
  addPost(post: Post): void {
    const posts = this.getPosts(post.userId); // Get posts for the user
    posts.push(post); // Add the new post
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts)); // Save updated posts
  }

  // Delete a post by ID
  deletePost(postId: number): void {
    let posts: Post[] = this.getPosts(0); // Get all posts
    posts = posts.filter(post => post.id !== postId); // Remove the post
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts)); // Save updated posts
  }

  // Update an existing post (used to update privacy and other post details)
  updatePost(updatedPost: Post): void {
    let posts: Post[] = this.getPosts(0); // Get all posts
    posts = posts.map(post => (post.id === updatedPost.id ? updatedPost : post)); // Update post
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts)); // Save updated posts
  }

  // Toggle the privacy of a post (private to public or vice versa)
  togglePrivacy(postId: number, currentUserId: number): void {
    let posts: Post[] = this.getPosts(currentUserId); // Get posts for the current user
    const post = posts.find(p => p.id === postId); // Find the post by ID

    if (post) {
      post.private = !post.private; // Toggle the privacy flag
      this.updatePost(post); // Save the updated post in localStorage
    }
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts));
  }
  
}
