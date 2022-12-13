import { AuthenticationError } from "apollo-server-core"
import jwt from 'jsonwebtoken'

type TToken = {
    id: number
    address: string
}

const verify = (jwtToken: string | undefined) => {
    // getting a token from authorization header
    if (!jwtToken) throw new AuthenticationError("Not authen!...")

    let accessToken = jwtToken.split("Bearer ")[1]
    if (!accessToken) accessToken = jwtToken
    if (!accessToken) throw new AuthenticationError("You need to perform Token!...")

    const decoded = <TToken>jwt.verify(accessToken, `${process.env.SECRET_KEY}`)
    if (!decoded) throw new AuthenticationError("JWT is invalid!...")

    return decoded
    
}

export default verify