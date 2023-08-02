import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-form-modal',
  templateUrl: './post-form-modal.component.html',
  styleUrls: ['./post-form-modal.component.scss']
})

export class PostFormModalComponent 
{
 
  title: string='';
  description: string='';
  imageFile: File | undefined;
 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.imageFile = file;
    } else {
     console.log('Image file not found');
    }
  }

  onSubmit(): void {
    if (!this.title || !this.description || !this.imageFile) {
      // Handle form validation errors here (e.g., show an error message)
      return;
    }


  }
}
