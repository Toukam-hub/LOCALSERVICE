import { Component } from '@angular/core';

@Component({
  selector: 'app-temoignage',
  imports: [
  ],
  templateUrl: './temoignage.component.html',
  standalone: true,
  styleUrl: './temoignage.component.css'
})
export class TemoignageComponent {
  images: string[] = [
    'assets/images/t1.jpeg',
    'assets/images/t2.jpeg',
    'assets/images/t3.jpeg',
    'assets/images/t4.jpeg'
  ];

  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change d’image toutes les 3 secondes
  }

}
