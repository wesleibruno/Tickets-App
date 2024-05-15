import prisma from "@/prisma/db";
import TIcketDetails from "@/app/tickets/[id]/TIcketDetails";

interface Props {
  params: {
    id: string;
  };
}
const ViewTicket = async ({ params }: Props) => {
  if (!/^\d+$/.test(params.id)) {
    return <p className="text-destructive">Invalid ID!</p>;
  }
  
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  const users = await prisma.user.findMany();

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TIcketDetails ticket={ticket} users={users} />;
};

export default ViewTicket;
