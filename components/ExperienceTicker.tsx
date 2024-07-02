import { getExpToNextLevel, getLevel } from "@/app/lib/exp-utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "./ui/card";
import { Progress } from "./ui/progress";
import { LEVEL_BREAKPOINTS } from "@/constants";

type ExperienceTickerProps = {
    exp: number,
};

export function ExperienceTicker({ exp }: ExperienceTickerProps) {

    const level = getLevel(exp);
    const expThisLevel = LEVEL_BREAKPOINTS[level + 1] - LEVEL_BREAKPOINTS[level];
    const expToNext = getExpToNextLevel(exp);
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>EXP</CardDescription>
                <CardTitle className="text-4xl">{exp}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {expToNext} points to next level
                </div>
            </CardContent>
            <CardFooter>
                {expToNext &&

                    <Progress value={expThisLevel - expToNext} max={expThisLevel} aria-label="points-left" />
                }
            </CardFooter>
        </Card>
    );
}