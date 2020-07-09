import app from './api/app'

const port = require('./config/config')().serverPort;



app.listen(port, () => {
    console.log(`\n[SERVER] Running at http://localhost:${port}\n`)
})




