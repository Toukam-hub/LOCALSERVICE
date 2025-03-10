import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-introduction',
  imports: [CommonModule ],
  templateUrl: './introduction.component.html',
  standalone: true,
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent implements OnInit{

  images: string[] = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/3.jpeg',
    '/assets/images/4.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg'
  ];
  currentImage!: string;
  intervalId: any;

  ngOnInit() {
    this.currentImage = this.images[0];
    this.startImageChange();
  }

  startImageChange() {
    this.intervalId = setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  changeImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    this.currentImage = this.images[(currentIndex + 1) % this.images.length];
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Nettoyez l'intervalle lors de la destruction du composant
  }
}
