import { expect, test } from 'vitest';
import { TaskTickerStatic } from './TaskTickerStatic';
import { render } from '@testing-library/react';

test("renders number of tasks performed when 0", () => {
    const { getByText } = render(<TaskTickerStatic numTasks={0} />);
    expect(getByText("0")).toBeDefined();
});

test("renders number of tasks performed", () => {
    const { getByText } = render(<TaskTickerStatic numTasks={10} />);
    expect(getByText("10")).toBeDefined();
});