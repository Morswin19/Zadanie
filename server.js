const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
const port = 3000

app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
})

// add cors origin to remove cors policy error
app.use(cors({
    origin: "http://127.0.0.1:5500"
}
))

// fetch data from monogo endpoint
app.get('/monogo', async (request, response) => {
    const api_url = "https://www.monogo.pl/competition/input.txt"
    const fetch_response = await fetch(api_url)
    const json = await fetch_response.json()
    response.json(json)
})