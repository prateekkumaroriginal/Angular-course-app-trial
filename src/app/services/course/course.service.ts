import { Injectable, signal } from '@angular/core';
import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses = signal<Course[]>([]);

  constructor() { }

  get coursesSignal() {
    return this.courses.asReadonly();
  }

  getCourses() {
    return this.courses();
  }

  loadCourses = () => {
    const data = localStorage.getItem(Strings.STORAGE_KEY);

    if (data) {
      const courses = JSON.parse(data);
      this.courses.set(courses);
    }
  }

  addCourse = (data: Course) => {
    this.courses.update((courses) => {
      const updatedCourses = [
        ...courses,
        { ...data, id: courses.length }
      ]
      this.setItem(updatedCourses);
      return updatedCourses;
    });
  }

  deleteCourses = (course: Course) => {
    this.courses.update((courses) => {
      const updatedCourses = courses.filter(c => c.id !== course.id);
      this.setItem(updatedCourses);
      return updatedCourses;
    })
  }

  setItem(courses: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(courses));
  }
}
