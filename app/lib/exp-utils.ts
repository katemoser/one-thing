import { BASE_DIFFICULTY_MULTIPLIER, FIRST_TIME_BONUS, POSTPONEMENT_MULTIPLIER } from "@/constants";


//TODO: change to base exp
function calculateExp(difficulty: number, numPostponements: number):number {

  // const assignment = await prisma.assignment.findFirstOrThrow({
  //     where: {
  //         id: assignmentId,
  //     },
  //     include: {
  //         userTask: true
  //     }
  // });

  // TODO: Work on this!
  let exp = (
      (difficulty * BASE_DIFFICULTY_MULTIPLIER) - (numPostponements * POSTPONEMENT_MULTIPLIER));
  // if hasn't been postponed yet, add on bonus:

  // if (numPostponements === 0) exp += FIRST_TIME_BONUS;

  return exp;
}

//TODO: need calc bonuses function and calc totalExp function

export {calculateExp}