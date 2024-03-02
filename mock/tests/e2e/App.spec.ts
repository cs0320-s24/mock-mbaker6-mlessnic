import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  //await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  //await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByText("Enter command here!")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, I see a button", async ({ page }) => {
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit button")).toBeVisible();
  // TODO WITH TA: Fill this in!
});

test("after I click the button with a bad command, I get feedback that that command is bad", async ({
  page,
}) => {
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("badinput.csv");
  await page.getByLabel("Submit button").click();
  const mock_input = "badinput.csv";
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command " + mock_input + " not found"
  );
});

test("after I enter load, my csv gets loaded", async ({ page }) => {
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  const mock_input = "load strings.csv false";
  await page.getByLabel("Command input").fill(mock_input);
  await page.getByLabel("Submit button").click();

  await expect(page.getByLabel("repl-history")).toContainText(
    "Loading file at destination"
  );
});

test("I can load and view a mocked csv", async ({ page }) => {
  await page.getByLabel("Login").click();
  const loadCommand = "load strings.csv false";
  await page.getByLabel("Command input").fill(loadCommand);
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();

  // Assumes that if first two elems of csv were displayed, csv was displayed
  await expect(page.getByLabel("repl-history")).toContainText("The");
  await expect(page.getByLabel("repl-history")).toContainText("song");
});

test("I can call search after loading, and get the first row of the table", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  const loadCommand = "load strings.csv false";
  await page.getByLabel("Command input").fill(loadCommand);
  await page.getByLabel("Submit button").click();
  const searchCommand = "search song";
  await page.getByLabel("Command input").fill(searchCommand);
  await page.getByLabel("Submit button").click();

  // Assumes that if first two elems of csv were displayed, csv was displayed
  await expect(page.getByLabel("repl-history")).toContainText("The");
  await expect(page.getByLabel("repl-history")).toContainText("song");
});

test("After loading and viewing a csv, I can load and view a different csv", async ({
  page,
}) => {
  await page.getByLabel("Login").click();

  // Load and view strings.csv
  const loadCommand1 = "load strings.csv false";
  await page.getByLabel("Command input").fill(loadCommand1);
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();
  // Assumes that if first two elems of csv were displayed, csv was displayed
  await expect(page.getByLabel("repl-history")).toContainText("The");
  await expect(page.getByLabel("repl-history")).toContainText("song");

  // Load and view more_strings.csv
  const loadCommand2 = "load more_strings.csv false";
  await page.getByLabel("Command input").fill(loadCommand2);
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();
  // Assumes that if first two elems of csv were displayed, csv was displayed
  await expect(page.getByLabel("repl-history")).toContainText("More");
  await expect(page.getByLabel("repl-history")).toContainText("strings");
});

test("I cannot try to view a csv before loading", async ({ page }) => {
  // NOTE: our implementation has the caveat that loading a csv then trying to load a bad second csv and viewing that one will result in the first csv getting displayed
  //  We do not remove a loaded csv except when overriding it with a new load
  await page.getByLabel("Login").click();
  const viewCommand = "view";
  await page.getByLabel("Command input").fill(viewCommand);
  await page.getByLabel("Submit button").click();
  await expect(page.getByLabel("repl-history")).toContainText("No csv loaded");
});

test("I cannot try to search a csv before loading", async ({ page }) => {
  await page.getByLabel("Login").click();
  const searchCommand = "search term";
  await page.getByLabel("Command input").fill(searchCommand);
  await page.getByLabel("Submit button").click();

  await expect(page.getByLabel("repl-history")).toContainText("No csv loaded");
});

test("I cannot load without providing a filepath and a header flag", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  const loadCommand = "load incorrect_arguments";
  await page.getByLabel("Command input").fill(loadCommand);
  await page.getByLabel("Submit button").click();
  // header flag is checked first, even before a bad path is checked
  await expect(page.getByLabel("repl-history")).toContainText(
    "Missing or incorrect hasHeader argument, please provide the command in the format"
  );
});

test("verbose display changes when user enters mode command", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  const modeCommand = "mode";
  await page.getByLabel("Command input").fill(modeCommand);
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Submit button").click();
  // header flag is checked first, even before a bad path is checked
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command: Output: No command given"
  );
  const loadCommand = "load strings.csv false";
  await page.getByLabel("Command input").fill(loadCommand);
  await page.getByLabel("Submit button").click();
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command:  Output: No command givenCommand: loadOutput: Loading file at destination strings.csv"
  );
  const modeCommand2 = "mode";
  await page.getByLabel("Command input").fill(modeCommand);
  await page.getByLabel("Submit button").click();
  await expect(page.getByLabel("repl-history")).toContainText(
    "No command givenLoading file at destination strings.csv"
  );
});
