import { z } from "zod";

export const UserInSchema = z.object({
  username: z
    .string({ message: "Nome de usuário, máximo de 20 caracteres" })
    .max(20),
  password: z.string({ message: "Senha do usuário" }),
  fullname: z.string({ message: "Nome completo do usuário" }),
});

export type UserIn = z.infer<typeof UserInSchema>;
