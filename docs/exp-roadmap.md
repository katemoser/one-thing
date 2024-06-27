EXP Brainstorm

- would be great to have EXP/user points
- every completed assignment will add points
- stored in userTask will be the user's "base difficulty" for that task
	- this will get updated every time it's completed.
- we're tracking the number of times a task is postponed
	- this will increase the difficulty score of a userTask
- the number of points/EXP a user gets for completing an assignment will be based on the relationship between base difficulty of UserTask and number of postponements
	- distilled, it will be basedifficulty x some multiplier - num postponements x some multiplier
- Example:
	- Making the bed -- base difficulty score starts at 3
	- DAY 1
	- the user postpones it twice
	- on the third time, the user completes the task
		- EXP will equal difficulty score x 10 - postpone number x 5 = 20
		- the base difficulty will be adjusted based on number of postponements, becomes 4
	- DAY 2
	- the user postpones once
	- completes the second time
		- EXP = 4 x 10 - 5 = 35
		- base difficulty is adjusted based on num postponements -- one postponement, stays the same
	- DAY 3
	- user doesn't postpone -- completes the first time
		- EXP = 4 x 10 + first time bonus (10) = 50
- Need to come up with some way of making tasks that are regularly completed on the first try lower in difficulty over time -- maybe the first time someone visits the app daily we can update these things? come back to this

Updates to schema:

User:
	EXP
UserTask:
	base difficulty score (everything starts at 3, until we have a more robust intake)

Eventually:
- New users will out an intake form determining how difficult starter tasks are for them
- What is EXP for?? Leveling up? What's leveling up for?? TBD