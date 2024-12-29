import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MessageParsingService } from '../services/message-parsing.service'
import { Router } from '@angular/router'
import { FavouritesService } from '../services/favourites.service'

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    fileName: string | undefined
    showError: boolean = false

    constructor(
        private messageParsingService: MessageParsingService,
        private favouritesService: FavouritesService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    public readFileContent(file: File): Promise<string> {
        return new Promise<string>((resolve) => {
            if (!file) {
                resolve('')
            }

            const reader = new FileReader()

            reader.onload = (e) => {
                const text = reader.result!.toString()
                resolve(text)
            }
            reader.readAsText(file)
        })
    }

    public async onFileSelected(event: any) {
        const file: File = event.target.files[0]
        if (file) {
            console.log(file.type + ' uploaded')
            this.fileName = file.name
            const formData = new FormData()
            formData.append('thumbnail', file)
            const fileContent = await this.readFileContent(file)
            console.log(this.fileName)
            try {
                this.messageParsingService.parseJsonString(fileContent)
                this.favouritesService.initStorage(this.fileName)
                this.showError = false
                this.router.navigate(['view'])
            } catch (error) {
                this.showError = true
                console.error('Error parsing uploaded file: ', error)
            }
        }
    }
}
