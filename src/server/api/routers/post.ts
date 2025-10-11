import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(users).values({
  //       id: ctx.session.user.id,
  //       name: input.name,
  //     });
  //   }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.db.query.users.findFirst({
  //     orderBy: (users, { desc }) => [desc(users.createdAt)],
  //   });

  //   return user ?? null;
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure.query(() => {
//     // return {
//     //   greeting: `Hello World`,
//     // };
//     return "Hello World";
//   }),
// });
