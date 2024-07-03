import { expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import { ExperienceTicker } from './ExperienceTicker';
import { LEVEL_BREAKPOINTS } from '@/constants';

test('renders properly when 0 exp', () => {
    render(<ExperienceTicker exp={0} />);
    expect(screen.getByText(`${LEVEL_BREAKPOINTS[1]} points to next level`)).toBeDefined();
});

test('renders properly when at next level', () => {
    render(<ExperienceTicker exp={LEVEL_BREAKPOINTS[1]} />);
    console.log(`${LEVEL_BREAKPOINTS[2] - LEVEL_BREAKPOINTS[1]} points to next level`)
    expect(screen.getByText(`${LEVEL_BREAKPOINTS[2] - LEVEL_BREAKPOINTS[1]} points to next level`)).toBeDefined();
});

