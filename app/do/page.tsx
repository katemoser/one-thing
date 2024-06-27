import prisma from "../lib/prisma";
import { selectNextAssignment } from "../actions";
import { Assignment } from "@/components/Assignment";
import { AllComplete } from "@/components/AllComplete";

export default async function Page() {

    // TODO: Change this to run the "select next task" function

    const assignment = await selectNextAssignment("Kate");
    console.log("THIS IS THE NEXT ASSIGNMENT:", assignment);

    return (
        <div className="p-8 container grid justify-items-center">
            {assignment ?

                <Assignment
                    title={assignment.userTask.task.title}
                    description={assignment.userTask.task.description}
                    id={assignment.id}
                />
                :
                <AllComplete />
            }
        </div>
    );
}