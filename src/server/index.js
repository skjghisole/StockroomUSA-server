import express from 'express'

const app = express()
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Started on http://localhost:${port}`))