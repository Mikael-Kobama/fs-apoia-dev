"user server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";

const changeBioSchema = z.object({
  description: z
    .string()
    .min(4, "A Descricao precisa ter no minimo 4 caracteres"),
});

type ChangeBioSchema = z.infer<typeof changeBioSchema>;

export async function changeDescription(data: ChangeBioSchema) {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: "suario nao encontrado",
    };
  }

  const schema = changeBioSchema.safeParse(data);

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
        bio: data.description,
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
