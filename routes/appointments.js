import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as appointmentsCtrl from '../controllers/appointments.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

//localhost:3001/api/appointments/new
router.post('/', checkAuth, appointmentsCtrl.create)

export { router }
