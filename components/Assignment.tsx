"use client"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { cancelAssignment, completeAssignment, postponeAssignment } from "@/app/actions";

//TODO: typing and docs
export function Assignment({ title, description, id }) {
    return (
        <Card className="" >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description || "more info coming soon"}</CardDescription>
            </CardHeader>
            <CardFooter>
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