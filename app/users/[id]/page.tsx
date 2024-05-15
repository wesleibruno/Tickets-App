import options from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

interface Props {
  params: {
    id: string;
  };
}
const EditUser = async ({ params }: Props) => {
  if (!/^\d+$/.test(params.id)) {
    return <p className="text-destructive">Invalid ID!</p>;
  }
  const session = await getServerSession(options);
  const user = await prisma?.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (session?.user?.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required</p>;
  }

  if (!user) {
    return <p className="text-destructive">User not found!</p>;
  }
  user.password = "";
  return <UserForm user={user} />;
};

export default EditUser;
