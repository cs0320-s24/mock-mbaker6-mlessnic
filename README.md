> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

In this sprint, we are building a front-end application that allows users to load, view and search CSV files. We use HTML and CSS to set up a basic command-prompt interface, and TypeScript with React to organize components and process events in that interface. We used mocked data in place of CSV files to mock the functionality of our load, view, and search functions.

# Design Choices

- Our project splits the program into the following components, each handling a different function of the program. App.tsx is the top level component that handles the Login button. REPL.tsx sets up the REPL interface and allows the REPLInput and REPLHistory components to share information passed in by the user. REPLInput.tsx handles the user input. First, it populates the DataSourceMap with our mocked data and CommandRegistry with valid commands. When the user clicks
  the Submit button, it parses the user input, finds the corresponding function in the CommandRegistry and passes in the arguments to the function. If the command is "mode," it updates the verbose flag, which changes the way the output is displayed on the page. REPLHistory.tsx handles how command history is displayed:

# Errors/Bugs

# Tests

- We perform unit tests for our load, view and search functions.

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

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
