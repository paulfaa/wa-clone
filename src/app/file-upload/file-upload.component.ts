import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageParsingService } from '../services/message-parsing.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileName: string | undefined;
  showError: boolean = false;

  constructor(private messageParsingService: MessageParsingService,
    private favouritesService: FavouritesService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public readFileContent(file: File): Promise<string> {
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

  public async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log(file.type + " uploaded");
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const fileContent = await this.readFileContent(file);
      console.log(this.fileName);
      try {
        if (file.type == "application/json") {
          this.messageParsingService.parseJsonString(fileContent);
        }
        if (file.type == "text/plain") {
          this.messageParsingService.parseText(fileContent);
        }
        this.favouritesService.initStorage(this.fileName);
        this.showError = false;
        this.router.navigate(['view']);
      }
      catch (e) {
        this.showError = true;
        console.error("Error parsing uploaded file: ", e);
      }
    }
  }
}