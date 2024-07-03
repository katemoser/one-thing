import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { LevelTicker } from './LevelTicker';
import { LEVEL_BREAKPOINTS } from '@/constants';

test("shows correct level"), () => {
    const testingLevel = 0;
    const { getByText } = render(<LevelTicker exp={LEVEL_BREAKPOINTS[testingLevel]} />);
    expect(getByText(`Level ${testingLevel}`)).toBeDefined();
};
test("shows correct level"), () => {
    const testingLevel = 4;
    const { getByText } = render(<LevelTicker exp={LEVEL_BREAKPOINTS[testingLevel]} />);
    expect(getByText(`Level ${testingLevel}`)).toBeDefined();
};