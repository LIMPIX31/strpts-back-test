import { scheduleAllJobs }         from '@service/schedule'
import express                     from 'express'

import { init }                    from '@shared/app'
import { handler as errorHandler } from '@shared/exceptions'

const app = express()

app.use(express.json())

init(app)

await import('@service/routes')

app.use(errorHandler)

scheduleAllJobs()

const HOST = process.env.HOST ?? '0.0.0.0'
const PORT = Number(process.env.PORT ?? '9000')

app.listen(PORT, HOST, () => {
	console.log(`Listening on http://${HOST}:${PORT}`)
})
