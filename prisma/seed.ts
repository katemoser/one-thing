import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // test core tasks
  const tasks = await prisma.task.createManyAndReturn({
    data: [
      { title: "Brush Teeth" },
      { title: "Take a shower" },
      { title: "Make Bed" },
      { title: "Clear off desk" },
      { title: "Do Laundry" },
      { title: "Drink Water" },
      { title: "Vacuum" },
    ]
  });

  // test users
  const user = await prisma.user.create({
    data: {
      username: "Kate",
      email: "kate@kate.com",
    }
  });

  // assign alltasks to user
  await Promise.all(tasks.map(task => prisma.userTask.create({
    data: {
      username: user.username,
      taskId: task.id
    }
  })));

}
main();