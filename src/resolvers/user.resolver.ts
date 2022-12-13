import jwt from "jsonwebtoken"
import { ApolloError, AuthenticationError } from "apollo-server-core"
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { User } from "../repositories/user.repository"
import { UserAccessTokenResponse, UserObjectResponse } from "../types/user.type"
import { catchErr } from "../utils/handleError"
import authMiddleware, { IContext } from "../middleware/auth.middleware"



@InputType()
export class CreateNewUser {
    @Field()
    email: string

    @Field()
    name: string

    @Field()
    address: string
}

@Resolver()
export class UserResolver {

     // query
     @Query(() => UserObjectResponse, { nullable: true })
     @UseMiddleware(authMiddleware)
     async getUserInfo(@Ctx() { req: { user_id } }: IContext): Promise<UserObjectResponse> {
         try {
             // query
             const user = await User.findById(user_id)
             return {
                 success: true,
                 data: user,
             }
         } catch (error: any) {
             return catchErr(error.message)
         }
     }

    @Mutation(() => UserObjectResponse, { nullable: true })
    async signupUser(
        @Arg("CreateNewUser") {address, email, name}: CreateNewUser): Promise<UserObjectResponse> {
        try {
            const lowerCaseAddress = address.toLowerCase()
            const existedUser = await User.findByAddress(lowerCaseAddress)
            if (existedUser) throw new ApolloError("This address is existed!")

            const newUser = await User.store({ address: lowerCaseAddress, name, email })
            return {
                success: true,
                msg: "Successfully create a new one!!!!!",
                data: newUser,
            }
        } catch (error: any) {
            return catchErr(error.message)
        }
    }

}
