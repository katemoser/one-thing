import { getCurrUser, selectNextAssignment } from "../actions";
import { AssignmentCard } from "@/components/Assignment";
import { AllComplete } from "@/components/AllComplete";
import { User } from "@prisma/client";
import { ExperienceTicker } from "@/components/ExperienceTicker";
import { Card } from "@/components/ui/card";
import { TaskTicker } from "@/components/TaskTicker";

export default async function Page() {

    const currUser = await getCurrUser() as User;
    // get completed assignments
    console.log("current user:", currUser);

    const next = await selectNextAssignment(currUser.username);

    console.log("THIS IS THE NEXT ASSIGNMENT:", next);

    return (
        <div className="container p-8 grid justify-items-center">
            <div className="flex flex-row gap-2">

                {/* <Card>user level</Card> */}


                <ExperienceTicker exp={currUser.exp} />

                <TaskTicker username={currUser.username} />
                {/* <Card>Num Tasks</Card> */}

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