import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MessageAudioComponent } from './message-audio.component'

describe('MessageAudioComponent', () => {
    let component: MessageAudioComponent
    let fixture: ComponentFixture<MessageAudioComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageAudioComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(MessageAudioComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
