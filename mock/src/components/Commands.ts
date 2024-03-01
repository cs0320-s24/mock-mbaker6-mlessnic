// import { load_csv } from "./CSVFunctions";
// import { view_csv } from "./CSVFunctions";
// import { search_csv } from "./CSVFunctions";
import { REPLFunction } from "./REPL";
import { mockedDataSourceMap, populateDataSourceMap } from "./mockedJson";

//const commandRegistry: Record<string, REPLFunction> = {};

export const commandRegistry = new Map();

function registerCommand(commandName: string, func: REPLFunction) {
  commandRegistry.set(commandName, func);
}

export function populateCommandRegistry() {
  commandRegistry.set("load", load_csv);
  commandRegistry.set("view", view_csv);
  commandRegistry.set("search", search_csv);
}

export function populateMockedData() {
  // Component unused, called populateDataSourceMap() in REPLInput directly
  populateDataSourceMap();
  // console.log("Loading csvs");
}

export function executeCommand(commandName: string, args: string[]) {
  // Component unused, handled directly in REPLInput
  const func = commandRegistry.get(commandName);
  if (func) {
    return func(args);
  } else {
    return "Command " + commandName + " not found";
  }
}

let csv: string[][];
let filePath: string;

export function load_csv(filepath: string) {
  filePath = filepath;
  // csv = mockedData.get(filepath);
  if (filepath in datamocked) {
    csv = datamocked[filepath];
    console.log("csv: " + datamocked[filepath]);
  } else {
  }

  if (!(filepath in datamocked)) {
    return "No file found at destination " + filepath;
    //return exampleCSV3;
  } else {
    return "Loading file at destination " + filepath;
  }
}

export function view_csv() {
  if (csv) {
    return csv;
  } else {
    return "No csv loaded";
  }
}

export function search_csv(query: string[]) {
  let output: string[][];
  //arbitrarily get the first row of the mocked data, to test for functionality
  output = [["Searching " + filePath + "with query " + query.join()]];
  if (csv) {
    output.concat(...output, csv[0]);
    return output;
  } else {
    return "No csv loaded";
  }
}

let datamocked: {
  [key: string]: string[][];
} = {};

datamocked["strings.csv"] = [
  ["The", "song", "remains", "the", "same."],
  ["The", "song", "remains", "the", "same."],
];

datamocked["more_strings.csv"] = [
  ["More", "strings", "for"],
  ["the", "string", "god"]
];
