// patch assignment -- update status!

import { cancelAssignment, completeAssignment, postponeAssignment, selectNextAssignment } from "@/app/actions";

export async function PATCH(request: Request, { params }: { params: { id: number; }; }) {
  console.log("hit patch /assignments/[id]");
  const id = Number(params.id)

  const { status, username } = await request.json();
  switch (status) {
    case "COMPLETED":
      await completeAssignment(id);
      console.log("completed!");
      break;
    case "POSTPONED":
      await postponeAssignment(id);
      console.log("postponed!");
      break;
    case "CANCELLED":
      await cancelAssignment(id);
      console.log("cancelled!");
      break;
    default:
      console.log("something has gone wrong.");
  }
  const nextAssignment = await selectNextAssignment(username);
  return Response.json({nextAssignment})
}