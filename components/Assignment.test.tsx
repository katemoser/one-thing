import { expect, test } from "vitest";
import {render} from "@testing-library/react";
import { AssignmentCard } from "./Assignment";

const testAssignment = {
    id: 1,
    description: "Test Description",
    title: "Test title",
    difficulty: 5,
    numPostponements: 0,
}

const testAssignmentPostponed = {
    id: 1,
    description: "Test Description",
    title: "Test title",
    difficulty: 5,
    numPostponements: 1,
}

test("renders assignment and bonus note when pp 0", () => {
    const { getByText } = render(<AssignmentCard  assignment={testAssignment}/>);
    expect(getByText("Test title")).toBeDefined();
    expect(getByText("+10 first time bonus")).toBeDefined();
});

test("renders assignment and no bonus note when pp 1", () => {
    const { getByText, queryByText } = render(<AssignmentCard  assignment={testAssignmentPostponed}/>);
    expect(getByText("Test title")).toBeDefined();
    expect(queryByText("+10 first time bonus")).toBeNull();
});