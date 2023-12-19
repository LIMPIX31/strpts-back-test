import { UserController } from '@service/controllers'
import { app }            from '@shared/app'

app.put('/:userId/balance', ...UserController.updateUserBalance)
