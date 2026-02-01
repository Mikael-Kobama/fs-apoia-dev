"user server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";

const changeNameSchema = z.object({
  name: z.string().min(4, "O username precisa ter no minimo 4 caracteres"),
});

type ChangeNameSchema = z.infer<typeof changeNameSchema>;

export async function changeName(data: ChangeNameSchema) {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: "suario nao encontrado",
    };
  }

  const schema = changeNameSchema.safeParse(data);

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
      },
    });

    return {
      data: user.name,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Falha na alteracao",
    };
  }
}
