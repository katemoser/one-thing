import prisma from "../lib/prisma";

export default async function Page() {

    // TODO: Change this to run the "select next task" function

    const tasks = await prisma.task.findMany({
        where: { type: "CORE" }
    });

    return (
        <>
            <p> This is where your task assignment will be:</p>
            <ul>
                {tasks.map(task => <li key={task.id}>{task.title}</li>) }
            </ul>
        </>
    );
}