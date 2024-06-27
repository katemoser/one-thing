"use client"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { cancelAssignment, completeAssignment, postponeAssignment, calculateExp } from "@/app/actions";

type assignmentProps = {
    title: string,
    description: string | null,
    id: number
}
//TODO: typing and docs
export function Assignment({ title, description, id }: assignmentProps) {

    let exp = calculateExp(id);
    return (
        <Card className="w-2/3" >
            <CardHeader >
                <CardTitle className="text-center">{title}  EXP: {exp}</CardTitle>
                <CardDescription>{description || "more info coming soon"}</CardDescription>
            </CardHeader>
            <CardFooter className="space-x-2">
                <Button
                    variant="secondary"
                    onClick={() => postponeAssignment(id)}>
                    Do this later
                </Button>
                <Button
                    onClick={() => completeAssignment(id)}>This is Done</Button>
                <Button
                    variant="destructive"
                    onClick={() => cancelAssignment(id)}>
                    I won't do this today
                </Button>
            </CardFooter>
        </Card>
    );
}