import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Product } from "@prisma/client";

export const productRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({});
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      let product: Product | null;
      if (input.id) {
        product = await ctx.prisma.product.findUnique({
          where: {
            id: input.id,
          },
        });
        if (product) {
          product = await ctx.prisma.product.update({
            data: {
              name: input.name,
              price: input.price,
            },
            where: {
              id: product.id,
            },
          });
        }
      }
    }),
});
