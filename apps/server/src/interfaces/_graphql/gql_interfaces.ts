import { JWTUser } from "interfaces/_jwt/interfaces";

export interface GraphQLContext {
    user?: JWTUser 
}


export  interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified?: string;
    nbf?: string;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string; 
    alg?: string;
    kid?: string;
    typ?: string;
  }
  