import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);
    setTimeout(() => {
      this.notificationSubject.next("");
    }, 3000);
  }
}
