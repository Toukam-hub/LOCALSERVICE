import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-animated-text',
  imports: [],
  templateUrl: './animated-text.component.html',
  standalone: true,
  styleUrl: './animated-text.component.css'
})
export class AnimatedTextComponent implements OnInit {
  text = "Offre valable cette semaine uniquement !";
  displayedText = '';
  index = 0;

  ngOnInit(): void {
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.displayedText += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), 100); // Délai entre chaque caractère
    } else {
      setTimeout(() => this.fadeOut(), 2000); // Délai avant de disparaître
    }
  }

  fadeOut() {
    const h2 = document.getElementById('animatedText');
    if (h2) {
      h2.style.opacity = '0'; // Fait disparaître le texte
      setTimeout(() => {
        this.displayedText = ''; // Efface le texte
        this.index = 0; // Réinitialise l'index
        setTimeout(() => this.reappear(), 1000); // Attendre avant de réapparaître
      }, 1000); // Délai avant de réinitialiser
    }
  }

  reappear() {
    const h2 = document.getElementById('animatedText');
    if (h2) {
      h2.style.opacity = '1'; // Fait réapparaître le texte
      this.type(); // Relance l'animation
    }
  }
}
