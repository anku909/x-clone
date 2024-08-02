import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import {  JWTUser } from "interfaces/_jwt/interfaces";



const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
;




class JWTService {
    public static  generateTokenForUser(user: User): string {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email,
        };
        
        const token = jwt.sign(payload, JWT_SECRET as string);
        return token;
    } 

    public static decodeToken(token : string){
        
        return jwt.verify(token, JWT_SECRET as string) as JWTUser;
    }
}


export default JWTService;