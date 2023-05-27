//import { z } from "zod";
//import { createTRPCRouter, protectedProcedure } from "../trpc";
//import { Student } from "@prisma/client";
//
//export const studentRoter = createTRPCRouter({
//  getAll: protectedProcedure.query(async ({ ctx }) => {
//    return await ctx.prisma.student.findMany();
//  }),
//  createMany: protectedProcedure
//    .input(
//      z.array(
//        z.object({
//          name: z.string(),
//          address: z.string(),
//        })
//      )
//    )
//    .mutation(async ({ ctx, input }) => {
//      let student: Student | null
//      student = await ctx.prisma.student.createMany({
//        data: void[input.map(() => {
//          name: input.name,
//          address: input.address
//        })]
//      })
//    }),
//});
