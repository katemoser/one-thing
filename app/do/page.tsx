import { getCurrUser, selectNextAssignment } from "../actions";
import { AssignmentCard } from "@/components/Assignment";
import { AllComplete } from "@/components/AllComplete";
import { User } from "@prisma/client";
import {ExperienceTicker} from "@/components/ExperienceTicker";

export default async function Page() {

    const currUser = await getCurrUser() as User;
    console.log("current user:", currUser)

    const next = await selectNextAssignment(currUser.username);

    console.log("THIS IS THE NEXT ASSIGNMENT:", next);

    return (
        <div className="container p-8 grid justify-items-center">
            <div className="exp">
                <ExperienceTicker exp={currUser.exp}/>
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