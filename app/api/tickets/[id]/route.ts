import prisma from "@/prisma/db";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const updatedTicket = await prisma.ticket.update({
    where: {
      id: ticket.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedTicket);
}
