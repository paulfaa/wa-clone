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
import {MatToolbarModule} from '@angular/material/toolbar';
import { FavouritesDialogComponent } from './favourites-dialog/favourites-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MonthPipe } from './date-picker/month.pipe';
import { PlayButtonComponent } from './play-button/play-button.component';
import { SetToArrayPipe } from './date-picker/set-to-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    DatePopupComponent,
    ChatViewComponent,
    OptionsMenuComponent,
    FileUploadComponent,
    LoadingSpinnerComponent,
    FavouritesDialogComponent,
    DatePickerComponent,
    MonthPipe,
    SetToArrayPipe,
    PlayButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
