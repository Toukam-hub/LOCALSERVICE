import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AnimatedTextComponent} from '../animated-text/animated-text.component';
import {NotificationService} from '../../service/notification.service';
import {MatIcon} from '@angular/material/icon';
import {CountdownComponent} from '../countdown/countdown.component';
import {FooterComponent} from '../footer/footer.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {NgForOf, NgIf} from '@angular/common';
import {AproposComponent} from '../apropos/apropos.component';
import {IntroductionComponent} from '../introduction/introduction.component';
import {TemoignageComponent} from '../temoignage/temoignage.component';

@Component({
  selector: 'app-presentation',
  imports: [
    AnimatedTextComponent,
    MatIcon,
    CountdownComponent,
    FooterComponent,
    NgForOf,
    NgIf,
    IntroductionComponent,
    TemoignageComponent
  ],
  templateUrl: './presentation.component.html',
  standalone: true,
  styleUrl: './presentation.component.css'
})
export class PresentationComponent implements OnInit, OnDestroy, AfterViewInit {

  videoUrl: string = "";
  private intervalId: any;
  public activeIndex: number | null = null;
  faqs = [
    {
      question: "Vous êtes dans quelle ville ?",
      answer: [
        "a) Côte d'Ivoire : Abidjan, MAN",
        "b) Cameroun : Douala, Yaoundé, Bafoussam, Bertoua."
      ]
    },
    {
      question: "Y-a-t-il une redevance mensuelle ?",
      answer: ["Non, notre plateforme vous est offerte gratuitement pendant au moins 5 ans."]
    },
    {
      question: "Comment fonctionne le système ?",
      answer: ["Le système utilise une recharge internet que vous devez effectuer mensuellement, le prix dépend naturellement de l'opérateur."]
    },
    {
      question: "Peut-on connecter à plusieurs appareils ?",
      answer: ["Oui, nous vous créons un compte personnalisé avec votre nom pour vous permettre de vous connecter facilement sur n'importe quel appareil !"]
    },
    {
      question: "Êtes-vous disponible en cas de vol ?",
      answer: ["Oui, nous vous donnons tous les moyens de tracker vous-même vos engins mais sommes également disponibles à collaborer avec vous et les autorités compétentes en cas de vol."]
    }
  ];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    const videoId = 'NU_1StN5Tkk';
    this.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.notificationService.showNotification("Une nouvelle personne viens de souscrire a un service");
    }, 60000);
  }

  ngAfterViewInit() {
    const menuButton = document.querySelector('.menu-toggle') as HTMLButtonElement;
    const menuList = document.querySelector('.header-right ul') as HTMLUListElement;

    if (menuButton && menuList) {
      menuButton.addEventListener('click', () => {
        menuList.classList.toggle('active'); // Ajoute ou retire la classe 'active'
      });

      const links = menuList.querySelectorAll('li a'); // Sélectionne tous les liens dans la liste
      links.forEach(link => {
        link.addEventListener('click', () => {
          menuList.classList.remove('active'); // Masque la liste
        });
      });
    }
  }

  redirectToYouTube() {
    const youtubeUrl = 'https://www.youtube.com/watch?v=NU_1StN5Tkk'; // Lien de la vidéo
    window.open(youtubeUrl, '_blank');
  }

  handleForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    this.dialog.open(FormComponent, dialogConfig);
  }

  toggleAnswer(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

}
