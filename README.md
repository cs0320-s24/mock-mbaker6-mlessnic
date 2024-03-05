> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

In this sprint, we are building a front-end application that allows users to load, view and search CSV files. We use HTML and CSS to set up a basic command-prompt interface, and TypeScript with React to organize components and process events in that interface. We used mocked data in place of CSV files to mock the functionality of our load, view, and search functions.

# Design Choices

Our project splits the program into the following components, each handling a different function of the program. App.tsx is the top level component that handles the Login button. REPL.tsx sets up the REPL interface and allows the REPLInput and REPLHistory components to share information passed in by the user. Finally, the Commands component contains the load, view, and search commands as well as the mocked datasource.
REPLInput.tsx handles the user input. First, it populates the DataSourceMap with our mocked data and CommandRegistry with valid commands. When the user clicks

the Submit button, it parses the user input, finds the corresponding function in the CommandRegistry and passes in the arguments to the function. If the command is "mode," it updates the verbose flag, which changes the way the output is displayed on the page. The output of the functions themselves can either be a string or a string[][] which get loaded into a custom type and appended to a list such that the REPLHistory has access to all commands entered by the user and their outputs.

REPLHistory.tsx handles how command history is displayed: it takes a list of outputs and their associated commands, stored as a list of type HistoryElement, and generates the necessary html to display the components as needed. It first checks the verbose flag to determine if the page must display the command and output. If that flag is set to true, REPLHistory will prepend the command along with the words “Command:” and “Output:”. Then, the code will check if the output is a string[][]. If this is the case, it breaks apart the array into individual elements and loads them into a table. If output is not a string[][], the output will be simply displayed as-is.

Finally, the Commands component contains the logic for the load, view, and search commands as well as providing developers with the ability to register their own commands. Commands are stored in a map so that when the map is instantiated with a name and list of args, the commands can be executed. All args are given as a string so if a function requires a string to be used as a different datatype, it must be coerced (and potentially casted). Load takes in a file path, which in this case must be one of the mocked CSVs here, and a hasHeader string. The hasHeader string can only contain the booleans “true” or “false”. Load returns a string to report success or failure and internally populates the csv and csvData objects so that later back end implementations can still have the necessary information to function. View requires no arguments but must be called after load. It returns a string[][] containing the entirety of the csv, or a string if no csv has been loaded at this point. An additional note about view is if a user loads a csv, tries to load a second, bad csv, and then calls view, view will return the contents of the FIRST csv because the stored csv only gets unloaded if a new csv gets loaded successfully. Search behaves similarly to view but takes in a query and (optionally) a column index. Finally, the registerCommand function is unused but can be used by a developer to add more custom commands to the commandRegistry.

# Errors/Bugs

We could not find any bugs at the moment but bugs could exist when connected to the back end, where users may provide filepaths outside the acceptable scope. Additionally, there may be extraneous data remaining in some internal structures when switching between a valid and invalid csv but testing such an issue has proven difficult.

# Tests

## Unit Tests:

- load returns success with good filename
- load returns fail with when no hasHeader argument is provided
- load returns fail when bad filename is provided
- loaded csv is updated when load is called twice
- view displayed successfully loaded csv
- view returns fail with no loaded csv
- view displays previously loaded csv if most recent load fails
- search is successful with loaded csv
- search fails with no loaded csv
- searches previously loaded csv if most recent load fails

## E2E Tests:

- on page load, i see a login button
- on page load, i dont see the input box until login
- after I type into the input box, its text changes
- on page load, I see a button
- after I click the button with a bad command, I get feedback that that command is bad
- after I enter load, my csv gets loaded
- I can load and view a mocked csv
- I can call search after loading, and get the first row of the table
- After loading and viewing a csv, I can load and view a different csv
- I cannot try to view a csv before loading
- I cannot try to search a csv before loading
- I cannot load without providing a filepath and a header flag
- verbose display changes when user enters mode command

# How to

### To launch the page,

```angular2html
npm start
```

http://localhost:8000/

### To load a csv file,

- ## load <csv file name> <hasHeader>

### To view a csv file,

- ## view

### To search a csv file,

- ## search <value> <column>

### Example command sequences:

Note: search arbitrarily returns the first row of the mocked dataset because the searching functionality would be provided by a back end

## load strings.csv false

## view

## search string 1

## load more_strings.csv true

## search strings

## load strings.csv true

## mode

## view

## load more_strings.csv false

## view

## load bad_path

## load bad_path true

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
