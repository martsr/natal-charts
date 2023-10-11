import Router from 'express'
import authMiddleware from '../middlewares/auth'
import { ChartController } from '../controllers/chart-controller'
const chartRouter=Router()
chartRouter.get('/',ChartController.getAll)
chartRouter.post('/',authMiddleware,ChartController.register)
chartRouter.patch('/:id',authMiddleware,ChartController.update)
chartRouter.delete('/:id',authMiddleware,ChartController.deleteChart)



export {chartRouter}