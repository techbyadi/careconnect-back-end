import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as appointmentsCtrl from '../controllers/appointments.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, appointmentsCtrl.create)
router.get('/', checkAuth, appointmentsCtrl.index)

export { router }
