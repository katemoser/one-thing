"use server";

import prisma from "./lib/prisma";

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
            status: "COMPLETED"
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
            pointValue: { increment: 1 }

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
            status: "CANCELLED"
        }
    });

    console.log("cancelled", cancelled);
    return cancelled;
}

export {
    createAssignment,
    completeAssignment,
    postponeAssignment,
    cancelAssignment
};