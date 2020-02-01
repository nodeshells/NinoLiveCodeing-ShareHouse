import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatMenuModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // AngularFireAnalyticsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule.forRoot(),
    MatSidenavModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
