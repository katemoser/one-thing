"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/prisma";
import _ from 'lodash';

// TODO: find better datetime library -- moment.js?

/**
 * takes a username and finds the next thing they should be assigned
 *
 * looks at pending tasks (to reassign) and userTasks (to create a new one)
 */
async function selectNextAssignment(username: string) {

    updateAssignments(username);


    // get all today's Pending assignments if there isn't one assigned current
    const now = new Date();

    //check if there is a current assignment from today:
    let nextAssignment = await prisma.assignment.findFirst({
        where: {
            isCurrent: true,
            userTask: {
                username: username,
            },
            assignedAt:{
                gte: new Date(now.toDateString())
            }
        },
        include: {
            userTask: {
                include: {
                    task: true
                }
            }
        }
    });

    // If there's not a current assignment, assign a new one:
    if (!nextAssignment) {
        const assignments = await prisma.assignment.findMany({
            where: {
                userTask: {
                    username: username,
                },
                assignedAt: {
                    gte: new Date(now.toDateString()), // create new date object passing in just today's date.
                },
                OR: [
                    {
                        lastPostponedAt: null,
                    },
                    {
                        lastPostponedAt: {        // only include assignments that haven't been postponed in the last 2 minutes TODO: change to longer
                            lte: new Date(now.setMinutes(now.getMinutes() - 2)) //create timestamp for 2 minutes ago
                        }
                    }
                ],
                status: "PENDING",

            },
            include: {
                userTask: {
                    include: {
                        task: true,
                    }
                }
            }
        });

        nextAssignment = _.sample(assignments) || null; // if there aren't any, assign to null instead of undefined
        //update to current assignment if there's a valid assignment
        if (nextAssignment) {

            await prisma.assignment.update({
                where: {
                    id: nextAssignment.id
                },
                data: {
                    isCurrent: true
                }
            });
        }
    }
    return nextAssignment;

}

/** Update assignments -- create new assignments if a user doesn't have an
 * assignment for a specific task that their usertask says they should have
 *
 * TODO: handle old pending assignments
 * TODO: add in functionality for making current task not current if it is expired
 */

async function updateAssignments(username: string) {

    const userTasks = await prisma.userTask.findMany({
        where: {
            username: username,
        },
        include: {
            task: true,
            assignments: true
        }
    });
    const now = new Date();

    for (let task of userTasks) {
        if (task.schedule === "EVERYDAY") {
            const todayAssignments = task.assignments.filter(a => {
                return a.assignedAt.toDateString() === now.toDateString();
            });
            if (todayAssignments.length === 0) {
                createAssignment(task.id);
            }
        }
    }
}

/** Create new assignment */
async function createAssignment(userTaskId: number) {

    const newAssignment = await prisma.assignment.create({
        data: {
            userTaskId: userTaskId,
        }
    });

    console.log("assignment created!");
    return newAssignment;
}

// TODO: have to add validation to this! Cannot complete assignment that is cancelled/already completed, etc
/** Complete assignment */
async function completeAssignment(assignmentId: number) {
    const completed = await prisma.assignment.update({
        where: {
            id: assignmentId
        },
        data: {
            status: "COMPLETED",
            completedAt: new Date(),
            isCurrent: false
        }
    });
    console.log("assignment completed:", completed);
    revalidatePath("/go");
    // return completed;
}


/** Postpone assignment
 *
 * keeps status as pending and increments point value
*/
async function postponeAssignment(assignmentId: number) {
    const postponed = await prisma.assignment.update({
        where: {
            id: assignmentId
        },
        data: {
            status: "PENDING",
            numPostponements: { increment: 1 },
            lastPostponedAt: new Date(),
            isCurrent: false

        }
    });
    console.log("postponed:", postponed);
    revalidatePath("/go");
    // return postponed;
}

/** Cancel assignment */

async function cancelAssignment(assignmentId: number) {
    const cancelled = await prisma.assignment.update({
        where: {
            id: assignmentId
        },
        data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
            isCurrent: false,
        }
    });

    console.log("cancelled", cancelled);
    revalidatePath("/go");
    // return cancelled;
}

/**
 * calculates the exp that will be earned by completing this assignment
 *
 * */
async function calculateExp(assignmentId: number){
    const BASE_MULTIPLIER = 10;
    const POSTPONEMENT_MULTIPLIER = 5;

    const assignment = await prisma.assignment.findFirstOrThrow({
        where:{
            id: assignmentId,
        },
        include: {
            userTask: true
        }
    })

    // TODO: Work on this!
    const exp = (
        (assignment.userTask.difficulty * BASE_MULTIPLIER) - (assignment.numPostponements * POSTPONEMENT_MULTIPLIER))
    console.log("assignment:", assignment)

    return exp;
}
export {
    createAssignment,
    completeAssignment,
    postponeAssignment,
    cancelAssignment,
    selectNextAssignment,
    calculateExp
};