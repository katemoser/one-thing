"use server";

import prisma from "./lib/prisma";
import _ from 'lodash';


/**
 * takes a username and finds the next thing they should be assigned
 *
 * looks at pending tasks (to reassign) and userTasks (to create a new one)
 */
async function selectNextAssignment(username: string) {

    const userTasks = await prisma.userTask.findMany({
        where: {
            username: username,
        },
        include: {
            task: true,
            assignments: {
                where: {
                    status: "PENDING"
                }
            }
        }
    });
    console.log("tasks including pending assignments:", userTasks);

    // high level idea -- just on EVERYDAY tasks:
    // look at the user's tasks
    // look at completed assignments for today; these don't need to be done right now.
    // create an assignment for any task with an EVERYDAY schedule that
    // doesn't have a completed assignment or PENDING assignment for today
    // select an assignment randomly from any that haven't been postponed yet;
    // if there are none, select one that has been postponed today

    // TODO: what to do with pending assignments from yesterday/past days
    // TODO: find better datetime library -- moment.js?

    // create today's assignments if needed! TODO: put this in updateAssignments below
    const today = new Date();

    for (let task of userTasks) {
        if (task.schedule === "EVERYDAY") {
            const pendingAssignments = task.assignments.filter(a => {
                return a.status === "PENDING" && a.assignedAt.toDateString() === today.toDateString();
            });
            if (pendingAssignments.length === 0) {
                createAssignment(task.id);
            }
        }
    }

    // get all today's assignments

    const assignments = await prisma.assignment.findMany({
        where: {
            userTask: {
                username: username,
            },
            assignedAt: {
                gte: new Date(today.toDateString()), // create new date object passing in just today's date.
            },
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

    return _.sample(assignments);

}

/** Update assignments */

async function updateAssignments(username: string) {
    // put assignment update stuff in here!
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
    return completed;
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

    return postponed;
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
    return cancelled;
}

export {
    createAssignment,
    completeAssignment,
    postponeAssignment,
    cancelAssignment,
    selectNextAssignment
};