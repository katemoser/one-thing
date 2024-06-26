import prisma from "../lib/prisma";
import { selectNextAssignment } from "../actions";
import { Assignment } from "@/components/Assignment";

export default async function Page() {

    // TODO: Change this to run the "select next task" function

    const assignment = await selectNextAssignment("Kate");
    console.log("THIS IS THE NEXT ASSIGNMENT:", assignment);

    return (
        <div>
            {assignment ?

            <Assignment
                title={assignment.userTask.task.title}
                description={assignment.userTask.task.description}
                id={assignment.id}
                />
                : "NO TASKS LEFT"
        }
        </div>
    );
}