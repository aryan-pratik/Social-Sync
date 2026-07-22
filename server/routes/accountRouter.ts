import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { addAccount, disconnectAccount, getAccounts } from "../controllers/accountController.js"

const accountRouter = express.Router()

accountRouter.get('/', protect, getAccounts)
accountRouter.get('/', protect, addAccount)
accountRouter.get('/:id', protect, disconnectAccount)

export default accountRouter;