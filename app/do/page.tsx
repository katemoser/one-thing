import prisma from "../lib/prisma";
import { selectNextAssignment } from "../actions";

export default async function Page() {

    // TODO: Change this to run the "select next task" function

    const assignment = await selectNextAssignment("Kate");
    console.log("THIS IS THE NEXT ASSIGNMENT:", assignment);

    return (
        <div>
            <h3>{assignment?.userTask.task.title || "no task"}</h3>
        </div>
    );
}