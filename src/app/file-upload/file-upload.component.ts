import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileName = '';

  constructor() { }

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
        console.log(this.fileName)
        console.log(fileContent);
    }
  }
}