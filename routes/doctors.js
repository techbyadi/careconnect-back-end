import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as doctorsCtrl from '../controllers/doctors.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post('/', doctorsCtrl.create)
router.get('/', doctorsCtrl.index)
router.get('/:doctorId', doctorsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:doctorId/reviews', checkAuth, doctorsCtrl.createReview)
router.put('/:doctorId/reviews', checkAuth, doctorsCtrl.updateReview)
router.delete('/:doctorId/reviews/:reviewId', checkAuth, doctorsCtrl.deleteReview)

export { router }
