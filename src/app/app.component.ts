import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RoomService} from './services/room.service';
import {skip, tap} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Message} from './interfaces/message';
import {Item} from './interfaces/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  player: YT.Player;
  playerVars = {
    controls: 1
  };
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
  youtubeForm = this.fb.group({
    url: ['', Validators.required]
  });
  messages$: Observable<Message[]> = this.roomService.getMessages();
  id = 'hc0ZDaAZQT0';
  items = new Array(44);
  roomItems: Item[] = [];

  constructor(private authService: AuthService, private roomService: RoomService, private fb: FormBuilder) {
    this.roomService.getLatestMessage().pipe(skip(1)).subscribe(messages => {
      if (!messages[0]) {
        return;
      }
      const message = messages[0];
      if (!this.messages[message.uid]) {
        this.messages[message.uid] = [];
      }
      this.messages[message.uid].unshift(message.body);
      setTimeout(() => {
        this.messages[message.uid].pop();
        this.roomService.deleteMessage(message.id);
      }, 5000);

    });

    this.roomService.videoId$.subscribe(videoId => {
      if (this.player) {
        // console.log(videoId);
        this.player.loadVideoById(videoId);
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

  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    this.player.mute();
  }

  changeVideo() {
    if (this.youtubeForm.valid) {
      this.roomService.changeVideo(this.youtubeForm.value.url);
      this.youtubeForm.reset();
    }
  }

  putItem(i: number) {
    this.roomItems.push(
      {
        size: 'md',
        id: i
      }
    );
  }

  changeItemSize(index: number, size: 'sm' | 'md' | 'lg') {
    this.roomItems[index].size = size;
  }
}
