/*
  Demo: test ordinary Java/TypeScript
*/

// Test the functionality of the load, view, search functions directly

import { expect, test } from 'vitest';

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from '../../src/main';
import * as commands from '../../src/components/Commands';

// test('is 1 + 1 = 2?', () => {
//   expect(1 + 1).toBe(2)
// })

// // Notice how you can test vanilla TS functions using Playwright as well!
// test('main.zero() should return 0', () => {
//   expect(main.zero()).toBe(0)
// })

// // For more information on how to make unit tests, visit:
// // https://jestjs.io/docs/using-matchers

test('Load returns success with good filename', () =>{
  expect(commands.load_csv("strings.csv")).toBe("Loading file at destination strings.csv")
})

test('Load returns fail with bad filename', () => {
  expect(commands.load_csv("bad_string")).toBe("No file found at destination bad_string")
})

// TODO: add more test cases