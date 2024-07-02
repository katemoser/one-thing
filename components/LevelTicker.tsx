import { getLevel } from "@/app/lib/exp-utils";
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
};

export function LevelTicker({ exp }: ExperienceTickerProps) {

    const level = getLevel(exp);
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>Level</CardDescription>
                <CardTitle className="text-4xl">{level}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Keep doing one thing
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    );
}