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
/**
 * This isn't doing quite what I want it to do -- not currently in use
 *
 * TODO: come back to this later
 *
 * It needs to get updated any time a new assignment is added
 */
export function TaskTicker({ username }: TaskTickerProps) {

    const [range, setRange] = useState<TimeRange>("TODAY");
    const [numTasks, setNumTasks] = useState(0);

    console.log("time ticker running. range =", range)

    /** runs whenever the range is changed -- gets completed assignments from that range
     * TODO: deal with loading?
     *
     * TODO: how do i make sure this gets updated when a task is done??
     *          could wrap it in a controller/dashboard component?
     *          could pass all assignments (fetched in parent) and filter here based on state <== maybe the way to go
     *
     */
    useEffect(function getAssignmentsOnRangeChange() {
        async function getAssignments() {
            const [startDate, endDate] = getDatesForTimeRange(range);
            console.log("start:", startDate, "end:", endDate);
            const completedAssignments = await getCompletedAssignments(username, startDate, endDate)
            setNumTasks(completedAssignments.length);
        }

        getAssignments()

    }, [range, username]);

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