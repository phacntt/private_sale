import jwt from "jsonwebtoken"
import { AuthenticationError } from "apollo-server-express"
import { MiddlewareFn, NextFn } from "type-graphql"
import { Request, Response } from "express"
import { User } from "../repositories/user.repository"
import { catchErr } from "../utils/handleError"
import verify from "../utils/jwt"

interface IExtendRequest extends Request {
    user_id: number
}

export interface IContext {
    req: IExtendRequest
    res: Response
}

const authMiddleware: MiddlewareFn<IContext> = async ({ context }, next: NextFn) => {
    try {
        // getting a token from authorization header
        
        const { id, address } = verify(context.req.headers.authorization)

        // check user exist in DB
        const user = await User.findOneBy({ id, address })
        if (!user) throw new AuthenticationError("You have not permission...")

        context.req.user_id = user.id
        return next()
    } catch (error: any) {
        console.log(error)
        return catchErr(error.message)
    }
}

export default authMiddleware
