"use client";

import { getCompletedAssignments } from "@/app/actions";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "./ui/card";
import { useEffect, useState } from "react";
import { getDatesForTimeRange } from "@/app/lib/exp-utils";
import { TimeRange } from "@/app/lib/definitions";

type TaskTickerProps = {
    username: string,
};

const RANGE_FLOW = {
    "TODAY": "WEEK",
    "WEEK": "MONTH",
    "MONTH": "YEAR",
    "YEAR": "ALL",
    "ALL": "TODAY"
};

const RANGE_TO_DESCRIPTION = {
    "TODAY": "today",
    "WEEK": "this week",
    "MONTH": "this month",
    "YEAR": "this year",
    "ALL": "since you started"
}

export function TaskTicker({ username }: TaskTickerProps) {

    const [range, setRange] = useState<TimeRange>("MONTH");
    const [numTasks, setNumTasks] = useState(0);

    console.log("time ticker running. range =", range)

    useEffect(function getTasksOnRangeChange() {
        async function getTasks() {
            const [startDate, endDate] = getDatesForTimeRange(range);
            console.log("start:", startDate, "end:", endDate);
            const completedAssignments = await getCompletedAssignments(username, startDate, endDate)
            setNumTasks(completedAssignments.length);
        }

        getTasks()

    }, [range]);
    // const completed = await getCompletedAssignments(username);

    function changeRange(){
        setRange(curr => RANGE_FLOW[curr] as TimeRange);
    }
    return (
        <Card x-chunk="dashboard-05-chunk-1" onClick={changeRange}>
            <CardHeader className="pb-2">
                <CardDescription>Tasks Completed {RANGE_TO_DESCRIPTION[range]}:</CardDescription>
                <CardTitle className="text-4xl">{numTasks}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    5 completions to next milestone
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}