import { z } from "zod";

export const UserBaseSchema = z.object({
  username: z
    .string({ message: "Nome de usuário, máximo de 20 caracteres" })
    .max(20),
  fullname: z.string({ message: "Nome completo do usuário" }),
  password: z.string({ message: "Senha do usuário" }),
});

export const UserInSchema = UserBaseSchema;

export const UserLoginSchema = z.object({
  username: z
    .string({ message: "Nome de usuário, máximo de 20 caracteres" })
    .max(20),
  password: z.string({ message: "Senha do usuário" }),
});

export const UserOutSchema = UserBaseSchema.omit({ password: true }).extend({
  id: z.number({ message: "ID único do usuário" }),
});

export type UserIn = z.infer<typeof UserInSchema>;
export type UserOut = z.infer<typeof UserOutSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
