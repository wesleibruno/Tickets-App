import prisma from "@/prisma/db";
import { ticketPatchSchema } from "@/ValidationSchemas/ticket";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../../auth/[...nextauth]/options";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);
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

  if (body?.assignedToUserId) {
    body.assignedToUserId = Number(body.assignedToUserId);
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

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "USER" &&
    session.user.role !== "TECH"
  ) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: {
      id: ticket.id,
    },
  });

  return NextResponse.json({ message: "Ticket deleted" });
}
