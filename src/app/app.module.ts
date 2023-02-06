import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatRadioModule} from '@angular/material/radio' 
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { DatePopupComponent } from './date-popup/date-popup.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessageService } from './services/message.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    DatePopupComponent,
    ChatViewComponent,
    OptionsMenuComponent,
    FileUploadComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
