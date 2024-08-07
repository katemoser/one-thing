
import { getUserForHomepage } from "@/app/actions";

/**GET: gets detailed information about a single user
 *
 * returns JSON like: {
 * user: {
 *    username,
 *    email,
 *    createdAt,
 *    exp,
 *    level,
 *    assignments: []
 *  }
 * }
*/
export async function GET(request: Request, { params }: { params: { username: string; }; }) {

  console.log("request headers IN ROUTE:", request.headers)
  try {

    const user = await getUserForHomepage(params.username);
    return Response.json({ user });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500, // or another appropriate status code
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
/** PUT/PATCH: updates user's information, returns updated info */

/** DELETE: deletes a user, returns deleted user's id */