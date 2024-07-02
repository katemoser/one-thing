import { BASE_DIFFICULTY_MULTIPLIER, FIRST_TIME_BONUS, LEVEL_BREAKPOINTS, POSTPONEMENT_MULTIPLIER } from "@/constants";
import { TimeRange } from "./definitions";


//TODO: change to base exp
function calculateExp(difficulty: number, numPostponements: number): number {

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

function getDatesForTimeRange(range: TimeRange): [Date, Date] {
  console.log("in getDatesForTimeRange. range:", range);

  const now = new Date(); // end date will always be now
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDay();

  let start = new Date(year, month, day); // set to today, without time.

  switch (range) {
    case "ALL":
      console.log("range is ALL");
      start = new Date("1-1-2020"); // set to before this app was created TODO:fix
      break;
    case "YEAR":
      console.log("range is YEAR");
      start = new Date(year, 0, 1); // first day of this year
      break;
    case "MONTH":
      console.log("range is MONTH");
      start = new Date(year, month, 1); // first day of this month
      break;
    case "WEEK":
      console.log("range is WEEK");
      const today = new Date(year, month, day);
      // want to set start to monday closest
      // found on stack overflow: https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
      const diff = today.getDate() - day + (day === 0 ? -6 : 1); //adjust for monday as first day of week
      start = new Date(today.setDate(diff));
      break;
  }

  return [start, now];
}

function getLevel(exp: number) {
  //takes exp points and determines which level a user is

  for (let level = 0; level < LEVEL_BREAKPOINTS.length - 1; level++) {
    if (exp >= LEVEL_BREAKPOINTS[level] && exp < LEVEL_BREAKPOINTS[level + 1]) {
      return level;
    }
  }
  //if it's out of bounds, return last level
  return LEVEL_BREAKPOINTS.length;
}

function getExpToNextLevel(exp: number) {
  const level = getLevel(exp);
  if (level >= LEVEL_BREAKPOINTS.length) {
    return 0;
  }

  return LEVEL_BREAKPOINTS[level + 1] - exp;
}
export {
  calculateExp,
  getDatesForTimeRange,
  getLevel,
  getExpToNextLevel
};