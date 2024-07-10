/** GET next assignment for this user */

import { selectNextAssignment } from "@/app/actions";

export async function GET(request: Request, { params }: { params: { username: string; }; }){

  const assignment = await selectNextAssignment(params.username)
  console.log("assignment:", assignment);
  return Response.json({assignment})
}