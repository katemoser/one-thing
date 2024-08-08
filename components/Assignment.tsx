"use client";
import { Assignment } from "@/app/lib/definitions";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { cancelAssignment, completeAssignment, postponeAssignment } from "@/app/actions";
import { calculateExp } from "@/app/lib/exp-utils";
import { FIRST_TIME_BONUS } from "@/constants";
// type assignmentProps = {
//     title: string,
//     description: string | null,
//     id: number;
// };
//TODO: typing and docs
export function AssignmentCard({ assignment }: { assignment: Assignment; }) {

    let exp = calculateExp(assignment.difficulty, assignment.numPostponements);
    return (
        <Card className="w-2/3" >
            <CardHeader className="container ">


                <CardTitle className="text-center group flex py-6">{assignment.title}
                    <div className="container">

                        <div>
                            Difficulty: {assignment.difficulty}
                        </div>
                        <div>
                            Exp: {exp}
                        </div>
                        <div className="bonus container text-xs p-3">
                            {assignment.numPostponements === 0 &&
                                <div className="">+{FIRST_TIME_BONUS} first time bonus</div>}
                        </div>
                    </div>
                    {/* <Card>
                        <CardHeader>

                            <CardTitle>
                                Difficulty:
                            </CardTitle>
                            <CardDescription>
                                Bonus:
                            </CardDescription>
                        </CardHeader>
                    </Card> */}
                </CardTitle>

                <CardDescription>{assignment.description || "more info coming soon"}</CardDescription>


            </CardHeader>
            <CardFooter className="space-x-2">
                <Button
                    variant="secondary"
                    onClick={() => postponeAssignment(assignment.id)}>
                    Do this later
                </Button>
                <Button
                    onClick={() => completeAssignment(assignment.id)}>This is Done</Button>
                <Button
                    variant="destructive"
                    onClick={() => cancelAssignment(assignment.id)}>
                    Not Today
                </Button>
            </CardFooter>
        </Card>
    );
}