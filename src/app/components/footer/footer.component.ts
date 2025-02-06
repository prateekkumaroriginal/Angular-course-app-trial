import { Component } from '@angular/core';
import { LucideAngularModule, Instagram, Github, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly Instagram = Instagram;
  readonly Github = Github;
  readonly Linkedin = Linkedin;
}
