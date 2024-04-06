import { Component } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  post: Post = {
    title: '',
    content: '',
  };

  constructor(private postService: PostService) {}

  onSubmit() {
    if (this.post.title === '' || this.post.content === '') {
      alert('Add Title and content');
      return;
    }

    this.postService.addPost(this.post).subscribe(
      (response) => {
        console.log('Post added successfully:', response);
        this.post = { title: '', content: '' };
        window.location.reload();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }
}
