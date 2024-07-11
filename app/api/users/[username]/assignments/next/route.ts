/** GET next assignment for this user */

import { selectNextAssignment } from "@/app/actions";

export async function GET(request: Request, { params }: { params: { username: string; }; }){
  console.log("request headers IN ROUTE:", request.headers)
  const assignment = await selectNextAssignment(params.username)
  console.log("assignment:", assignment);
  return Response.json({assignment})
}