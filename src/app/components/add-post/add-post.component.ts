import { Component } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  imageUrl: string = ''; // To store the image URL or file data
  caption: string = '';
  currentUser: User | null = null;
  imageSource: string = 'url'; // To track the image source type (URL or file)

  constructor(private postService: PostService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  // Function to handle file selection
  onImageSelected(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      // Create an image URL from the selected file
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the result as the image URL
      };

      // Read the selected file as a data URL (base64 string)
      reader.readAsDataURL(file);
    }
  }

  // Function to add the post
  addPost() {
    if (this.currentUser && this.imageUrl) {
      const newPost: Post = {
        id: Date.now(),
        userId: this.currentUser.id,
        imageUrl: this.imageUrl, // Using the selected image URL
        caption: this.caption,
        private: false, // Default is public
        likes: [],
        comments: [],
        username: this.currentUser.username,
      };

      this.postService.addPost(newPost);
      this.imageUrl = ''; // Clear the image URL or file data
      this.caption = '';  // Clear the caption
      alert('Post added successfully!');
    } else {
      alert('Please ensure you are logged in and have selected an image or entered a URL.');
    }
  }
}
