import { Button, buttonVariants } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "./ui/card";
import Link from "next/link";

/** Message that all assignments are complete for now
 *
 */
export function AllComplete() {

    return (
        <Card className="w-2/3">
            <CardHeader>
                <CardTitle>Nothing to do</CardTitle>
                <CardDescription> Come back later for more</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/reports">View Reports</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}