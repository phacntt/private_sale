import { Field, ObjectType } from "type-graphql"
import { IResponse } from "./response.type"
import { UserModel } from "../entities/user.model"

// Array/Collection
@ObjectType({ implements: IResponse })
export class UserArrResponse implements IResponse {
    success: boolean
    msg?: string

    @Field(() => [UserModel], { nullable: true })
    data?: UserModel[] | null
}

// Single
@ObjectType({ implements: IResponse })
export class UserObjectResponse implements IResponse {
    success: boolean
    msg?: string

    @Field(() => UserModel, { nullable: true })
    data?: UserModel | any
}

// JWT
@ObjectType({ implements: IResponse })
export class UserAccessTokenResponse implements IResponse {
    success: boolean
    msg?: string

    @Field(() => String, { nullable: true })
    accessToken?: string
}
