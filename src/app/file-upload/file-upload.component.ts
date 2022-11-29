import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileName = '';
  messageParsingService: MessageParsingService;

  constructor(public dialog: MatDialog) {
    this.messageParsingService = new MessageParsingService();
   }

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

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const fileContent = await this.readFileContent(file);
        console.log(this.fileName);
        console.log("FileContent: " + fileContent);
        this.messageParsingService.parseOldFormat(fileContent);
    }
  }
}

/*   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
} */