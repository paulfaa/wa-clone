import { MessageType } from 'src/app/models/message-type'
import { WhatsappMessage } from 'src/app/models/models'

const validChatFilePath = 'cypress/fixtures/validChat.json'
const invalidChatFilePath = 'cypress/fixtures/invalidChat.json'
const firstMessage = 'First message!'
const fileInput = 'input[type="file"]'

describe('Navigating to the base URL', () => {
    it('redirects to /upload by default', () => {
        cy.visit('/')
        cy.url().should('include', '/upload')
    })
})

describe('File upload', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should parse the contents of a valid file, and redirect to the view page', () => {
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
        cy.url().should('include', '/view')
    })

    it('should display an error if the file is invalid, and remain on the upload page', () => {
        cy.get(fileInput).selectFile(invalidChatFilePath, { force: true })
        cy.url().should('include', '/upload')
        cy.contains('Unable to process file')
    })

    it('clicking the title on the /view page should return to the /upload page', () => {
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
        cy.url().should('include', '/view')
        cy.contains('a', 'WA Viewer').click()
        cy.url().should('include', '/upload')
    })
})

describe('Chat view component', () => {
    beforeEach(() => {
        window.localStorage.clear()
        cy.visit('/')
    })

    it('it loads the messages from the first year and month of the provided file', () => {
        cy.visit('/')
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
        cy.url().should('include', '/view')
        cy.contains(firstMessage)
        cy.contains('This should not be visible by default').should('not.exist')
    })

    it('loads the last viewed year and month if a value exists in localStorage', () => {
        window.localStorage.setItem(
            'validChat.json.lastSelectedYearMonth',
            JSON.stringify({ year: 2025, month: 12 })
        )
        cy.visit('/')
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
        cy.url().should('include', '/view')
        cy.contains(firstMessage).should('not.exist')
        cy.contains('This should not be visible by default')
    })
})

describe('Favourites', () => {
    beforeEach(() => {
        window.localStorage.clear()
        cy.visit('/')
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
    })

    it('marks a message as favourited when clicked', () => {
        cy.contains(firstMessage).click()
        cy.get('.favourite')
            .filter(':has(.messageText:contains("First message!"))')
            .should('exist')
    })

    it('displays the favourites dialog when the user clicks the button in the header', () => {
        cy.contains('mat-icon', 'menu').click()
        cy.get('.mat-dialog-container').contains('Favourites')
    })

    it('dialog is empty if the user has not favourited any messages', () => {
        cy.contains('mat-icon', 'menu').click()
        cy.contains('No messages are favourited')
    })

    it('displays any favourited messages', () => {
        cy.contains(firstMessage).click()
        cy.contains('mat-icon', 'menu').click()
        cy.get('.mat-card-content').contains(firstMessage)
    })
})

describe('Favourites localstorage', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('loads any previously favourited messages when the app starts', () => {
        const savedMessage: WhatsappMessage = {
            id: 'msg1',
            timestamp: '2024-12-20T19:24:04Z',
            fromMe: false,
            type: MessageType.text,
            text: 'First message!',
        }
        const savedMap = new Map<string, Map<string, WhatsappMessage>>([
            [
                '2024-12',
                new Map<string, WhatsappMessage>([['msg1', savedMessage]]),
            ],
        ])
        const serializedData = Array.from(savedMap, ([key, innerMap]) => [
            key,
            Array.from(innerMap),
        ])
        window.localStorage.setItem(
            'validChat.json.favourites',
            JSON.stringify(serializedData)
        )
        cy.visit('/')
        cy.get(fileInput).selectFile(validChatFilePath, { force: true })
        cy.get('.favourite')
            .filter(':has(.messageText:contains("First message!"))')
            .should('exist')
        cy.contains('mat-icon', 'menu').click()
        cy.get('.mat-card-content').contains(firstMessage)
    })
})
