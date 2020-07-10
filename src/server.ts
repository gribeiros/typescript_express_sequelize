import app from './api/app'

const port = process.env.PORT



app.listen(port, () => {
    console.dir(`[SERVER] Running at http://localhost:${port}`)
})
