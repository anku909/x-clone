import { prismaClient } from "../../clients/db";
import { GraphQLContext } from "interfaces/_graphql/gql_interfaces";

interface CreateTweetPayload{
  content: string;
  imageUrl?: string;
}

const mutations = {
  createTweet: async (parent:any, {payload}:{payload: CreateTweetPayload}, ctx: GraphQLContext) => {
    if(!ctx.user) throw new Error("You are not Authenticated");
    const tweet = await prismaClient.tweet.create({
      data:{
        content: payload.content,
        imageUrl: payload.imageUrl,
        author: { connect: {id: ctx.user.id}}
      }
    })
    return tweet;
  }
}


export const resolvers = {mutations}