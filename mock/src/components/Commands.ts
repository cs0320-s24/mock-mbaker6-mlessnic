// import { load_csv } from "./CSVFunctions";
// import { view_csv } from "./CSVFunctions";
// import { search_csv } from "./CSVFunctions";
import { REPLFunction } from "./REPL";
import { mockedDataSourceMap, populateDataSourceMap } from "./mockedJson";

//const commandRegistry: Record<string, REPLFunction> = {};

export const commandRegistry = new Map();

type csv = {
  filepath: string;
  hasHeader: boolean;
}

function registerCommand(commandName: string, func: REPLFunction) {
  commandRegistry.set(commandName, func);
}

export function populateCommandRegistry() {
  commandRegistry.set("load", load_csv);
  commandRegistry.set("view", view_csv);
  commandRegistry.set("search", search_csv);
}

// export function populateMockedData() {
//   // Component unused, called populateDataSourceMap() in REPLInput directly
//   populateDataSourceMap();
//   // console.log("Loading csvs");
// }

// export function executeCommand(commandName: string, args: string[]) {
//   // Component unused, handled directly in REPLInput
//   const func = commandRegistry.get(commandName);
//   if (func) {
//     return func(args);
//   } else {
//     return "Command " + commandName + " not found";
//   }
// }

let csv: string[][];
let csvData: csv;

export function load_csv(args: string[]) {
  // console.log("args[0]" + args[0]);
  // csvData.filepath = args[0];
  // console.log("filepath" + csvData.filepath);
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
  // csv = mockedData.get(filepath);
  if (csvData.filepath in datamocked) {
    csv = datamocked[csvData.filepath];
    console.log("csv: " + datamocked[csvData.filepath]);
    return "Loading file at destination " + csvData.filepath;
  } else {
    return "No file found at destination " + csvData.filepath;
  }
}

// export function load_csv(filepath: string) {
//   csvData.filepath = filepath;
//   // csv = mockedData.get(filepath);
//   if (filepath in datamocked) {
//     csv = datamocked[filepath];
//     console.log("csv: " + datamocked[filepath]);
//   }

//   if (!(filepath in datamocked)) {
//     return "No file found at destination " + filepath;
//     //return exampleCSV3;
//   } else {
//     return "Loading file at destination " + filepath;
//   }
// }

export function view_csv() {
  if (csv) {
    return csv;
  } else {
    return "No csv loaded";
  }
}

export function search_csv(args: string[]) {
  let output: string[][];
  const [query, columnIndex] = args;
  //arbitrarily get the first row of the mocked data, to test for functionality
  // output = [["Searching " + csvData.filepath + " with query " + query + " and optional arguments " + csvData.hasHeader]];
  // if(columnIndex){
  //   output[0][0] = output[0][0]  + ", " + columnIndex;
  // }
  output = [[]]
  if (csv) {
    output.push(csv[0])
    console.log(output);
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
