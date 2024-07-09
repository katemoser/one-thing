import { describe, expect, test } from "vitest";

import {
  calculateExp,
  getLevel,
  getDatesForTimeRange,
  getExpToNextLevel
} from "@/app/lib/exp-utils";

describe("test utils", function(){

  test("calculates experience no postponement", function () {
    expect(calculateExp(3, 0)).toBe(30);
  });

  test("calculates experience 2 postponements", function () {
    expect(calculateExp(3, 2)).toBe(26);
  });

  test("calculates level", function () {
    expect(getLevel(0)).toBe(0);
    expect(getLevel(50)).toBe(0);
    expect(getLevel(75)).toBe(1);
    expect(getLevel(150)).toBe(2);
    expect(getLevel(1500000)).toBe(6);
  });

})

describe("get exp to next level", function(){
  test(" works at breakpoint", function(){
    expect(getExpToNextLevel(0)).toBe(75)
  })

  test(" works right before breakpoint", function(){
    expect(getExpToNextLevel(74)).toBe(1)
  })

  test(" works when at max level", function(){
    expect(getExpToNextLevel(10000)).toBe(0)
  })
})