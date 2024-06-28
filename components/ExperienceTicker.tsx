import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "./ui/card";
import { Progress } from "./ui/progress";

type ExperienceTickerProps = {
    exp: number,
}

export function ExperienceTicker({exp}: ExperienceTickerProps) {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>EXP</CardDescription>
                <CardTitle className="text-4xl">{exp}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    75 points to next level
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={25} aria-label="25% increase" />
            </CardFooter>
        </Card>
    );
}