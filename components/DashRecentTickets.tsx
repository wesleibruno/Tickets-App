import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketsPriority from "@/components/TicketsPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;
interface Props {
  tickets: TicketWithUser[];
}

const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tickets
            ? tickets.map((ticket) => (
                <div className="flex items-center" key={ticket.id}>
                  <TicketStatusBadge status={ticket.status} />
                  <div className="ml-4 space-y-1">
                    <Link href={`/tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                    </Link>
                  </div>
                  <div className="ml-auto font-medium">
                    <TicketsPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;

{
  /* <CardContent>
        {tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="block hover:bg-slate-800 hover:dark:bg-slate-700"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm">{ticket.title}</p>
              </div>
              <p className="text-sm">{ticket.updatedAt.toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </CardContent> */
}
