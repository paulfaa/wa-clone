import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageParsingService } from '../services/message-parsing.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileName: string | undefined;
  showError: boolean = false;

  constructor(private messageParsingService: MessageParsingService, 
              private router: Router,
              public dialog: MatDialog
              ) {}

  ngOnInit(): void {
  }

  readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
        if (!file) {
            resolve('');
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = reader.result!.toString();
            resolve(text);

        };
        reader.readAsText(file);
    });
}

  async onFileSelected(event: any) {

    const file:File = event.target.files[0];
    const fileReader = new FileReader();

    if (file) {
        console.log(file.type + " uploaded");
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const fileContent = await this.readFileContent(file);
        console.log(this.fileName);
        try{
          if(file.type == "application/json"){
            this.messageParsingService.parseJson(fileContent);
          }
          if(file.type == "text/plain"){
            this.messageParsingService.parseText(fileContent);
          }
          this.showError = false;
          this.router.navigate(['view']);
        }
        catch(e){
          this.showError = true;
          console.error("Error parsing uploaded file: ", e);
        }
    }
  }
}