import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../services/message.service';

import { FileUploadComponent } from './file-upload.component';
import { MessageParsingService } from '../services/message-parsing.service';
import { FavouritesService } from '../services/favourites.service';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;
  let mockMessageParsingService: jasmine.SpyObj<MessageParsingService>;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getMessages']);
  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['initStorage']);
  mockMessageParsingService = jasmine.createSpyObj('mockMessageParsingService', ['parseJson', 'parseText']);

  const event = {
    "target" : {
      "files" : {
        "file" : {
          "name" : "fileName",
          "type" : "application/json",
          "contents" : "Contents of the file"
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule],
      declarations: [ FileUploadComponent ],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('readFileContent()', () => {
    it('can deal with empty files', async () => {
      // Arrange
      const file = null;
      //const file = {"File" : null, "lastModified" : null, "name" : null, "webkitRelativePath" : null, "size" : null, "type" : null, "arrayBuffer" : null, "slice" : null};

      // Act
      const result = await component.readFileContent(file as unknown as File);

      // Assert
      expect(result).toEqual('');
     });

     it('parses the contents of files', async () => {
      // Arrange
      const file = new File(['Hello World!'], 'test.txt', {type: 'text/plain'});

      // Act
      const contents = await component.readFileContent(file);

      // Assert
      expect(contents).toEqual('Hello World!');

     });
  });

  describe('onFileSelected()', () => {
    it('throws an exception if there is an error parsing file', async () => {
      //arrange
      //Mockito.when(mockMessageParsingService.parseJson("")).thenThrow(new Error());

      //act
      component.onFileSelected(event);

      //assert
      expect(component.fileName).toBe("fileName");
      expect(mockMessageParsingService.parseJson).toHaveBeenCalled();
    });
    it('calls the parseJson() method of messageService when json file is uploaded', async () => {
      //arrange
      expect(component.fileName).toBe(undefined);

      //act
      component.onFileSelected(event);

      //assert
      expect(component.fileName).toBe("fileName");
      expect(mockMessageParsingService.parseJson).toHaveBeenCalled();
    });
  });
});
