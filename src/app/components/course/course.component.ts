import { Component, input, Input, output} from '@angular/core';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-course',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})

export class CourseComponent {
  @Input() course: any;
  isAdmin = input(false);
  del = output();

  readonly Trash2 = Trash2;

  deleteCourse = () => {
    this.del.emit(this.course);
  }
}
