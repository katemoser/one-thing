import { getCompletedAssignments } from "@/app/actions";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "./ui/card"

type TaskTickerProps = {
    username: string,
}

export async function TaskTicker({username}: TaskTickerProps){

    const completed = await getCompletedAssignments(username);

    return (
        <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
            <CardDescription>Tasks Completed:</CardDescription>
            <CardTitle className="text-4xl">{completed.length}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-xs text-muted-foreground">
                5 completions to next milestone
            </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
    </Card>
    )
}