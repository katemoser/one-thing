"use server";

import prisma from "./lib/prisma";

/**
 * takes a username and finds the next thing they should be assigned
 *
 * looks at pending tasks (to reassign) and userTasks (to create a new one)
 */
async function selectNextAssignment(username: string){

    const userTasks = await prisma.userTask.findMany({
        where:{
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
    })
    console.log("tasks including pending assignments:", userTasks);
    return userTasks;

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