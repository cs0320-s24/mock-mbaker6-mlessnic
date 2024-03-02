import { REPLFunction } from "./REPL";
import { mockedDataSourceMap, populateDataSourceMap } from "./mockedJson";

/**
 * Map to store registered commands.
 */
export const commandRegistry = new Map();

/**
 * Interface representing the necessary field to retrieve a CSV from the back end.
 */
type csv = {
  filepath: string;
  hasHeader: boolean;
}

/**
 * Registers a command with the given name and function (unused here, for user story 6).
 * @param {string} commandName - The name of the command.
 * @param {REPLFunction} func - The function associated with the command.
 */
function registerCommand(commandName: string, func: REPLFunction) {
  commandRegistry.set(commandName, func);
}

/**
 * Populates the command registry with predefined commands.
 */
export function populateCommandRegistry() {
  commandRegistry.set("load", load_csv);
  commandRegistry.set("view", view_csv);
  commandRegistry.set("search", search_csv);
}

let csv: string[][];
let csvData: csv;

/**
 * Loads a CSV file.
 * @param {string[]} args - The arguments for loading the CSV file, a filepath and a hasHeader boolean.
 * @returns {string} A message indicating the result of the operation.
 */
export function load_csv(args: string[]) {
  if(args[1] && (args[1] === "true" || args[1] === "false")){
    const hasHdr = args[1] === "true";
    csvData = {
      filepath: args[0],
      hasHeader: hasHdr
    };
  } else{
    // Error checking for missing or malformed hasHeader arg
    return "Missing or incorrect hasHeader argument, please provide the command in the format: \n\"load <filename> true|false\"";
  }

  // Mocking retrieval/loading of the csv
  if (csvData.filepath in datamocked) {
    csv = datamocked[csvData.filepath];
    console.log("csv: " + datamocked[csvData.filepath]);
    return "Loading file at destination " + csvData.filepath;
  } else {
    return "No file found at destination " + csvData.filepath;
  }
}

/**
 * Returns the loaded CSV.
 * @returns {string[][] | string} The loaded CSV or a message indicating no CSV is loaded.
 */
export function view_csv() {
  if (csv) {
    return csv;
  } else {
    return "No csv loaded";
  }
}

/**
 * Searches the loaded CSV.
 * @param {string[]} args - The arguments for searching the CSV, a query and optional columnIndex (unused, will
 *  be used when connecting to back end).
 * @returns {string[][] | string} The search results or a message indicating no CSV is loaded.
 */
export function search_csv(args: string[]) {
  let output: string[][];
  const [query, columnIndex] = args;
  output = [[]]
  if (csv) {
    // arbitrarily get the first row of the mocked data, to test for functionality
    output.push(csv[0])
    // console.log(output);
    return output;
  } else {
    return "No csv loaded";
  }
}

/**
 * Object containing mocked data for CSVs.
 */
let datamocked: {
  [key: string]: string[][];
} = {};

// Mocked data
datamocked["strings.csv"] = [
  ["The", "song", "remains", "the", "same."],
  ["The", "song", "remains", "the", "same."],
];

datamocked["more_strings.csv"] = [
  ["More", "strings", "for"],
  ["the", "string", "god"]
];
