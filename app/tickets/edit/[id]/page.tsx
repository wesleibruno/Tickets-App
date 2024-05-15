import options from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

interface Props {
  params: {
    id: string;
  };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});
const EditTicket = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (
    session?.user?.role !== "ADMIN" ||
    session?.user?.role !== "TECH" ||
    session?.user?.role !== "USER"
  ) {
    return <p className="text-destructive">Access denied</p>;
  }
  const ticket = await prisma?.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }
  return <TicketForm ticket={ticket} />;
};

export default EditTicket;
