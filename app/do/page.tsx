import { getCompletedAssignments, getCurrUser, selectNextAssignment } from "../actions";
import { AssignmentCard } from "@/components/Assignment";
import { AllComplete } from "@/components/AllComplete";
import { Prisma, User } from "@prisma/client";
import { ExperienceTicker } from "@/components/ExperienceTicker";
import { TaskTicker } from "@/components/TaskTicker";
import prisma from "../lib/prisma";
import { TaskTickerStatic } from "@/components/TaskTickerStatic";

export default async function Page() {

    const currUser = await getCurrUser() as User;
    console.log("current user:", currUser);
    // function to find tasks completed in date range for task ticker:

    const completed = await getCompletedAssignments(currUser.username);

    // get next assignment
    const next = await selectNextAssignment(currUser.username);

    console.log("THIS IS THE NEXT ASSIGNMENT:", next);

    return (
        <div className="container p-8 grid justify-items-center">
            <div className="flex flex-row gap-2">

                <ExperienceTicker exp={currUser.exp} />

                <TaskTickerStatic numTasks={completed.length} />


            </div>

            <div className="p-8 container grid justify-items-center">
                {next ?

                    <AssignmentCard
                        assignment={next}
                    />
                    :
                    <AllComplete />
                }
            </div>
        </div>
    );
}