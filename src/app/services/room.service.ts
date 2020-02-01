import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Light} from '../interfaces/light';
import {Message} from '../interfaces/message';
import {Video} from '../interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  lightStatus$ = this.db.doc<Light>('room/light').valueChanges().pipe(
    map(data => data && data.status));

  videoId$ = this.db.doc<Video>('room/video').valueChanges().pipe(
    map(data => data && data.id)
  );

  constructor(private db: AngularFirestore) {
  }

  getUsers(): Observable<User[]> {
    return this.db.collection<User>('users').valueChanges();
  }

  toggleLight(status: boolean) {
    this.db.doc('room/light').set({status: !status});
  }

  sendMessage(uid: string, body: string) {
    const id = this.db.createId();
    this.db.doc<Message>(`message/${id}`).set({
      id,
      uid,
      body,
      createdAt: new Date()
    });
  }

  deleteMessage(docId: string) {
    this.db.doc(`message/${docId}`).delete();
  }

  getLatestMessage(): Observable<Message[]> {
    return this.db.collection<Message>('message', ref => ref.orderBy('createdAt', 'desc').limit(1))
      .valueChanges()
      .pipe(
        map(docs => {
          return docs && docs;
        }));
  }

  getMessages(): Observable<Message[]> {
    return this.db.collection<Message>('message').valueChanges();
  }

  changeVideo(url: string) {
    const matcher = url.match(/https:\/\/www\.youtube\.com\/watch\?v=(.+)/);
    if (matcher) {
      // console.log(matcher[1]);
      const videoId = matcher[1];
      this.db.doc<Video>('room/video').set({id: videoId}, {merge: true});
    } else {
      console.log('urlが不正です');
      return null;
    }
  }
}
