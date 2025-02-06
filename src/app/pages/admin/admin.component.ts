import { CommonModule, } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CoursesComponent } from '../courses/courses.component';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-admin',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CoursesComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  coverImage = signal<File | null>(null);
  coverImageUrl = signal<string | null>(null);

  private formBuilder = inject(FormBuilder);
  private courseService = inject(CourseService);

  courseForm = this.formBuilder.group({
    title: ["", [Validators.required, Validators.minLength(4)]],
    description: ["", [Validators.required]]
  });

  onSubmit = () => {
    console.log(this.courseForm.value);
    this.saveCourse(this.courseForm);
    this.courseForm.reset();
    this.coverImageUrl.set(null);
  }

  onFileSelected = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      this.coverImage.set(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.coverImageUrl.set(reader.result!.toString());
      }
      reader.readAsDataURL(file);
    }
  }

  saveCourse = (form: FormGroup) => {
    const formValue = form.value;

    const data = {
      coverImageUrl: this.coverImageUrl(),
      ...form.value
    };

    this.courseService.addCourse(data);
  }
}
