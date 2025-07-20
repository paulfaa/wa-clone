// server/server.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

function generateFilePath(filename) {
    const { name } = path.parse(filename)
    return path.join(__dirname, 'favourites', `${name}-favourites.json`)
}

app.get('/api/favourites', (req, res) => {
    const filename = req.headers['x-filename']
    console.log('Received GET /api/favourites', filename)
    if (!filename) {
        return res.status(400).json({ message: 'Missing x-filename header' })
    }
    const jsonFilePath = generateFilePath(filename)
    fs.access(jsonFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.sendStatus(204)
        }
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read favourites file:', err)
                return res
                    .status(500)
                    .json({ message: 'Failed to read file', error: err })
            }
            res.json(JSON.parse(data))
        })
    })
})

app.post('/api/favourites', (req, res) => {
    const filename = req.headers['x-filename']
    console.log('Received POST /api/favourites', filename)
    if (!filename) {
        return res.status(400).json({ message: 'Missing x-filename header' })
    }
    const jsonFilePath = generateFilePath(filename)
    fs.writeFile(
        jsonFilePath,
        JSON.stringify(req.body, null, 2),
        'utf8',
        (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to write favourites', error: err })
            }
            res.sendStatus(200)
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
