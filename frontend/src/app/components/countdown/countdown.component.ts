import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  standalone: true,
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit,OnDestroy{
  targetDate: Date = new Date();
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;

  ngOnInit() {
    this.setNextTargetDate();
    this.updateCountdown();
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  setNextTargetDate() {
    const now = new Date();
    // Calculez la prochaine date de réinitialisation (ex. : chaque lundi à 23h59)
    const nextReset = new Date(now);
    nextReset.setDate(now.getDate() + (7 - now.getDay()) % 7); // Prochain lundi
    nextReset.setHours(23, 59, 59, 999); // Définit l'heure à 23h59:59

    this.targetDate = nextReset;
  }

  updateCountdown() :void{
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      // Si la date cible est dépassée, réinitialisez à la prochaine date
      this.setNextTargetDate();
      return this.updateCountdown(); // Recalculez avec la nouvelle date
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

}
