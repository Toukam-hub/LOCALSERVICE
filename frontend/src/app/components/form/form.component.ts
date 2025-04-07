import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {GlobalConstantes} from '../../content/global-constantes';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {SendEmailService} from '../../service/send-email.service';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-form',
  imports: [
    FlexLayoutModule,
    MatToolbar,
    MatIcon,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    NgIf,
    MatNativeDateModule,
    NgForOf
  ],
  templateUrl: './form.component.html',
  standalone: true,
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  options = ['Moto', 'Voiture', 'Camion', 'Autre'];
  selectedOptions: { name: string, quantity: number }[] = [];
  form: any = FormGroup;
  joursDeLaSemaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  joursAffiches: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormComponent>,
    private readonly ngxService: NgxUiLoaderService,
    private readonly emailService: SendEmailService,
    private readonly snackBar :MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        contact: [null, [Validators.required, Validators.pattern(GlobalConstantes.contactNumberRegex)]],
        ville: [null, [Validators.required]],
        jour: ['', Validators.required]
      }
    );

    this.setJoursAffiches();
    this.setJourParDefaut();
  }

  //affiche les jour de la semaine en commencant pour la journée actuelle
  setJoursAffiches() {
    const maintenant = new Date();
    const heure = maintenant.getHours();

    let jourActuel = maintenant.toLocaleDateString('fr-FR', { weekday: 'long' });
    let jourCapitalized = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

    // Si l'heure est >= 17h, on passe au jour suivant
    if (heure >= 17) {
      const indexJour = this.joursDeLaSemaine.indexOf(jourCapitalized);
      const indexJourSuivant = (indexJour + 1) % this.joursDeLaSemaine.length;
      jourCapitalized = this.joursDeLaSemaine[indexJourSuivant];
    }

    const indexJourActuel = this.joursDeLaSemaine.indexOf(jourCapitalized);
    this.joursAffiches = [
      ...this.joursDeLaSemaine.slice(indexJourActuel),
      ...this.joursDeLaSemaine.slice(0, indexJourActuel)
    ];
  }


  setJourParDefaut() {
    const date = new Date();
    const jourActuel = date.toLocaleDateString('fr-FR', {weekday: 'long'});
    this.joursAffiches = this.joursAffiches.map(jour =>
      jour.toLowerCase() === jourActuel.toLowerCase() ? "Aujourd'hui" : jour
    );
    const indexAujourdui = this.joursAffiches.indexOf("Aujourd'hui");
    this.form.controls.jour.setValue(this.joursAffiches[indexAujourdui]);
  }

  openWhatsApp(message: string) {
    console.log("envoie de message wattsap")
    const phoneNumber = '653900250';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    console.log("URL WhatsApp générée :", url);
    window.open(url, '_blank');
  }

  showSnackbar(message:string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // en ms (ici 3s)
      verticalPosition: 'top', // ou 'bottom'
      horizontalPosition: 'center' // 'start', 'center', 'end', 'left', 'right'
    });
  }
  addSelection(event: MatSelectChange) {
    const selectedName = event.value;

    const existingItem = this.selectedOptions.find(item => item.name === selectedName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.selectedOptions.push({ name: selectedName, quantity: 1 });
    }
  }

  increaseQuantity(index: number) {
    this.selectedOptions[index].quantity++; // Augmente la quantité
  }

  decreaseQuantity(index: number) {
    if (this.selectedOptions[index].quantity > 1) {
      this.selectedOptions[index].quantity--;
    } else {
      this.selectedOptions.splice(index, 1);
    }
  }

  handleSubmit() {
    if (this.form.valid) {
      this.ngxService.start();

      let formsDate = this.form.value;
      let data = {
        contact: formsDate.contact,
        ville: formsDate.ville,
        date: formsDate.jour,
        type:JSON.stringify(this.selectedOptions)
      }

      const text = `
        Contact: ${data.contact},
        Ville: ${data.ville},
        Jour d'installation : ${data.date},
        Nature de l'Engin: ${data.type},
        `;
      console.log(data);
      this.emailService.sendEmail(data).subscribe(
        {
          next: res => {
            this.ngxService.stop();
            this.dialogRef.close();
            this.openWhatsApp(text);
            this.showSnackbar("Informations envoyées avec succès ✅");
            console.log("reponse lors de l'envoie des infos",res);
          },
          error: err => {
            this.ngxService.stop();
            this.dialogRef.close();
            this.showSnackbar("échec lors de l'envoi des informations  ❌");
            console.log(err);
          }
        }
      )
    }
  }
}
