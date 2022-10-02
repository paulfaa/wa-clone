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
import { FileUploadDirective } from './file-upload.directive';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    DatePopupComponent,
    ChatViewComponent,
    FileUploadDirective,
    OptionsMenuComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
