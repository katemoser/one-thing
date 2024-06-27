"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/prisma";
import _ from 'lodash';


/**
 * takes a username and finds the next thing they should be assigned
 *
 * looks at pending tasks (to reassign) and userTasks (to create a new one)
 */
async function selectNextAssignment(username: string) {

    updateAssignments(username);

    // TODO: after changing schema to hold onto current assignment,
    // grab current assignment

    // update assignments -- create new assignments for tasks that may not be assigned yet

    // get all today's Pending assignments if there isn't one assigned current
    const today = new Date();
    const assignments = await prisma.assignment.findMany({
        where: {
            userTask: {
                username: username,
            },
            assignedAt: {
                gte: new Date(today.toDateString()), // create new date object passing in just today's date.
            },
            OR: [
                {
                    lastPostponedAt: null,
                },
                {
                    lastPostponedAt: {
                        lte: new Date(today.setMinutes(today.getMinutes() -2)) //create timestamp for 2 minutes ago
                    }
                }
            ],
            status: "PENDING",

        },
        include: {
            userTask: {
                include: {
                    task: true
                }
            }
        }
    });

    console.log("today's assignments:", assignments);
    // change it up so that if you've already postponed a task today, it's not going to showup for a certain amount of time.

    return _.sample(assignments);

}

/** Update assignments -- create new assignments if a user doesn't have an
 * assignment for a specific task that their usertask says they should have
 */

async function updateAssignments(username: string) {
    // TODO: handle old pending assignments
    // TODO: add in functionality for making current task not current if it is expired


    const userTasks = await prisma.userTask.findMany({
        where: {
            username: username,
        },
        include: {
            task: true,
            assignments: true
        }
    });
    console.log("tasks including pending assignments:", userTasks);

    // TODO: find better datetime library -- moment.js?

    // create today's assignments if needed! TODO: put this in updateAssignments below
    const today = new Date();

    for (let task of userTasks) {
        if (task.schedule === "EVERYDAY") {
            const todayAssignments = task.assignments.filter(a => {
                return a.assignedAt.toDateString() === today.toDateString();
            });
            if (todayAssignments.length === 0) {
                createAssignment(task.id);
            }
        }
    }
}

/** Create new assignment */

async function createAssignment(userTaskId: number) {

    //TODO: need to add check here to make sure we actually need to add a new assignment

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
            completedAt: new Date()
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
            pointValue: { increment: 1 },
            lastPostponedAt: new Date()

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
            cancelledAt: new Date()
        }
    });

    console.log("cancelled", cancelled);
    revalidatePath("/go");
    // return cancelled;
}

export {
    createAssignment,
    completeAssignment,
    postponeAssignment,
    cancelAssignment,
    selectNextAssignment
};