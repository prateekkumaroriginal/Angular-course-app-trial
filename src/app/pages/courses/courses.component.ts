import { Component, computed, inject, input } from '@angular/core';
import { CourseComponent } from "../../components/course/course.component";
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses',
  imports: [CourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  private courseService = inject(CourseService);

  isAdmin = input(false);
  courses = computed(() => this.courseService.coursesSignal())

  constructor() { }

  ngOnInit() {
    this.courseService.loadCourses();
  }

  deleteCourse = (course: Course) => {
    this.courseService.deleteCourses(course);
  }
}
