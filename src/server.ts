import app from './api/app'

const port = process.env.PORT

app.listen(port || 3000, () => {
    console.dir(`[SERVER] Running at http://localhost:${port}`)
})
