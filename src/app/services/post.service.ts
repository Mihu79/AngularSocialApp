import { Injectable } from '@angular/core';

export interface Post {
username: any;
  id: number;
  userId: number;
  imageUrl: string;
  caption: string;
  likes: number[]; // Array of user IDs who liked the post
  comments: {
username: any; userId: number; text: string 
}[];
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly POST_KEY = 'posts';

  constructor() {}

  // Retrieve all posts from localStorage
  getPosts(): Post[] {
    const postsJson = localStorage.getItem(this.POST_KEY);
    return postsJson ? JSON.parse(postsJson) : [];
  }

  // Add a new post to localStorage
  addPost(post: Post): void {
    const posts = this.getPosts();
    posts.push(post);
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts));
  }

  // Delete a post by its ID
  deletePost(postId: number): void {
    let posts = this.getPosts();
    posts = posts.filter((post) => post.id !== postId);
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts));
  }

  // Update an existing post
  updatePost(updatedPost: Post): void {
    const posts = this.getPosts().map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    localStorage.setItem(this.POST_KEY, JSON.stringify(posts));
  }
}
