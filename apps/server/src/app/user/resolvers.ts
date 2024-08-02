import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt"
import { GoogleTokenResult, GraphQLContext } from "interfaces/_graphql/gql_interfaces";
import { UserData } from "interfaces/_prisma/_interfaces";




export const queries = {
  verifyGoogleToken: async (
    parent: any,
    {
      token,
    }: {
      token: string;
    }
  ) => {
    const googleToken = token;
      const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
      googleOauthURL.searchParams.set('id_token', googleToken);

      const { data } = await axios.get<GoogleTokenResult> (googleOauthURL.toString(), {
        responseType: 'json'
      })

      const user: UserData | null = await prismaClient.user.findUnique({
        where: {email: data.email},
      })

      if (!user){
          await prismaClient.user.create({
            data: {
              email:  data.email!,
              firstName: data.given_name!,
              lastName: data.family_name!,
              profileImageUrl: data.picture!
            },
          });
      }

      const userInDB = await prismaClient.user.findUnique({where: {email: data.email}})

      if (!userInDB) throw new Error("user with email not found!");

      const userToken = JWTService.generateTokenForUser(userInDB)
      
      return userToken
  },

  getCurrentUser: async(parent: any, args: any, ctx: GraphQLContext) => {    
    const id = ctx.user?.id;
    if(!id) return null ;   
    
    const user = await prismaClient.user.findUnique({where: {id}})
    return user;
  } 
};

export const resolvers = { queries };
