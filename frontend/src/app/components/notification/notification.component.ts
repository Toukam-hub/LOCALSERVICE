import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string = ''; // Déclaration explicite du type

  constructor(private readonly notification: NotificationService) {
  }

  ngOnInit(): void {
    this.notification.notification$.subscribe(msg => {
      this.message = msg;
      if (msg) {
        this.show();
      }
    });
  }

  show(): void {
    const notificationElement = document.getElementById('notification');
    if (notificationElement) {
      notificationElement.classList.remove('hide');
      notificationElement.classList.add('show'); // Affiche la notification
      setTimeout(() => {
        this.hide(notificationElement); // Appelle la méthode hide après 3 secondes
      }, 3000); // Durée d'affichage
    }
  }

  hide(notificationElement: HTMLElement): void {
    notificationElement.classList.remove('show'); // Cache la notification
    notificationElement.classList.add('hide'); // Fait disparaître vers la droite
    setTimeout(() => {
      this.message = ''; // Réinitialise le message après l'animation
    }, 500); // Durée de l'animation, doit correspondre à celle de CSS
  }
}
