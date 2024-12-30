import { z } from "zod";
import { ClassMinimalSchema } from "./class.schemas";

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

export const UserDetailsSchema = UserBaseSchema.extend({
  id: z.number(),
  classes_joined: ClassMinimalSchema.array(),
}).omit({ password: true });

export type UserIn = z.infer<typeof UserInSchema>;
export type UserOut = z.infer<typeof UserOutSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserDetails = z.infer<typeof UserDetailsSchema>;
export type UserPayload = {
  id: number;
  fullName: string;
  username: string;
};
