import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[fileUpload]'
})
export class FileUploadDirective {

  @HostBinding('class.fileOver') fileOver: boolean | undefined;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event: any){
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any){
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onFileDrop(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const file = event.dataTransfer.file;
    if (file){
      this.fileDropped.emit(file);
      console.log("file uploaded")
    }
  }
}
