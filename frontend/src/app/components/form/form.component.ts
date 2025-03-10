import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {GlobalConstantes} from '../../content/global-constantes';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
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

  form: any = FormGroup;
  joursDeLaSemaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  joursAffiches: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormComponent>,
    private readonly ngxService: NgxUiLoaderService,
    private readonly emailService: SendEmailService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        contact: [null, [Validators.required, Validators.pattern(GlobalConstantes.contactNumberRegex)]],
        ville: [null, [Validators.required]],
        jour: ['', Validators.required],
        type: [null, [Validators.required]]
      }
    );

    this.setJoursAffiches();
    this.setJourParDefaut();
  }

  setJoursAffiches() {
    const date = new Date();
    const jourActuel = date.toLocaleDateString('fr-FR', {weekday: 'long'});
    const jourCapitalized = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
    const indexJourActuel = this.joursDeLaSemaine.indexOf(jourCapitalized);
    this.joursAffiches = [...this.joursDeLaSemaine.slice(indexJourActuel), ...this.joursDeLaSemaine.slice(0, indexJourActuel)];
  }

  setJourParDefaut() {
    const date = new Date();
    const jourActuel = date.toLocaleDateString('fr-FR', {weekday: 'long'});
    this.joursAffiches = this.joursAffiches.map(jour =>
      jour.toLowerCase() === jourActuel.toLowerCase() ? "Aujourd'hui" : jour
    );
    const indexAujourdui = this.joursAffiches.indexOf("Aujourd'hui");
    this.form.controls.jour.setValue(this.joursAffiches[indexAujourdui]);
    console.log(jourActuel);
  }

  isDisabled(): boolean {
    const date = new Date();
    const heure = date.getHours();
    return heure >= 17;
  }

  openWhatsApp(message: string) {
    const phoneNumber = '653900250';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }


  handleSubmit() {
    if (this.form.valid) {
      this.ngxService.start();

      let formsDate = this.form.value;
      let data = {
        contact: formsDate.contact,
        ville: formsDate.ville,
        date: formsDate.jour,
        type: formsDate.type
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
            console.log(res);
          },
          error: err => {
            this.ngxService.stop();
            this.dialogRef.close();
            console.log(err);
          }
        }
      )
    }
  }
}
