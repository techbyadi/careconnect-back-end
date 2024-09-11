import { Router } from 'express'
import { decodeUserFromToken, checkAuth, isDoctor } from '../middleware/auth.js'
import * as doctorsCtrl from '../controllers/doctors.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', doctorsCtrl.index)
router.get('/:doctorId', doctorsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, isDoctor, doctorsCtrl.create)
router.post('/:doctorId/reviews', checkAuth, doctorsCtrl.createReview)
router.put('/:doctorId/reviews', checkAuth, doctorsCtrl.updateReview)
router.delete('/:doctorId/reviews/:reviewId', checkAuth, doctorsCtrl.deleteReview)

export { router }
