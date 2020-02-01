import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RoomService} from './services/room.service';
import {tap} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Message} from './interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rooms';
  messages = {};
  lightStatus$ = this.roomService.lightStatus$.pipe(
    tap(status => this.lightStatus = status)
  );
  user$ = this.authService.user$;
  users$ = this.roomService.getUsers();
  lightStatus: boolean;
  form = this.fb.group({
    body: ['', Validators.required]
  });
  messages$: Observable<Message[]> = this.roomService.getMessages();

  constructor(private authService: AuthService, private roomService: RoomService, private fb: FormBuilder) {
    this.roomService.getLatestMessage().subscribe(message => {
      if (!message) {
        return;
      }
      if (!this.messages[message.uid]) {
        this.messages[message.uid] = [];
      } else {
        this.messages[message.uid].unshift(message.body);
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout(uid: string) {
    this.authService.logout(uid);
  }

  toggleLight(status: boolean) {
    this.roomService.toggleLight(status);
  }

  sendMessage(uid: string) {
    this.roomService.sendMessage(uid, this.form.value.body);
    this.form.reset();
  }
}
