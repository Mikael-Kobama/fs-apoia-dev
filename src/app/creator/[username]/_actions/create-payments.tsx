"user server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPaymentSchema = z.object({
  slug: z.string().min(1, "Slug do creator é obrigatorio"),
  name: z.string().min(1, "o nome precisa ter pelo menos 1 letra"),
  message: z.string().min(5, "A mensagem pecisa ter pelo menoos 5 letras."),
  price: z.number().min(1500, "Selecione um valor maior que R$15"),
  creatorId: z.string(),
});

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createPaymentSchema.safeParse(data);

  if (!schema.success) {
    return null;
  }

  try {
    const creator = await prisma.user.findUnique({
      where: {
        id: data.creatorId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: "Falha ao ciar pagamento, tente mais tarde.",
    };
  }
}
