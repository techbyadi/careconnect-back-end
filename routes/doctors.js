import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as doctorsCtrl from '../controllers/doctors.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post('/', doctorsCtrl.create)
router.get('/', doctorsCtrl.index)


/*---------- Protected Routes ----------*/

export { router }
