import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AproposComponent} from '../apropos/apropos.component';

@Component({
  selector: 'app-footer',
  imports: [
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(
    private readonly dialog: MatDialog) {
  }

  handleApropos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%'; // Ou '50vw', selon vos besoins
    dialogConfig.maxWidth = '600px'; // Optionnel : une largeur maximale
    this.dialog.open(AproposComponent, dialogConfig);
  }

}
