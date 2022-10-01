import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatRadioModule} from '@angular/material/radio' 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { DatePopupComponent } from './date-popup/date-popup.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { FileUploadDirective } from './file-upload.directive';
import { OptionsMenuComponent } from './options-menu/options-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    DatePopupComponent,
    ChatViewComponent,
    FileUploadDirective,
    OptionsMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
