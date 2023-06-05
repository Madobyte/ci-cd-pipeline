import express from 'express'
import cors from 'cors'
import diagnoseRouter from './routes/diagnose'
import patientRouter from './routes/patient'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.static('client/build'))
app.use(cors())

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
