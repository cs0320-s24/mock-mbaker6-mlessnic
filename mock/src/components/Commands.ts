// import { load_csv } from "./CSVFunctions";
// import { view_csv } from "./CSVFunctions";
// import { search_csv } from "./CSVFunctions";
import { REPLFunction } from "./REPL";

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

export function executeCommand(commandName: string, args: string[]) {
  // Component unused, handled directly in REPLInput
  const func = commandRegistry.get(commandName);
  if (func) {
    return func(args);
  } else {
    return "Command " + commandName + " not found";
  }
}

export function load_csv(filepath: string) {
  return "Loading file at destination " + filepath;
}

export function view_csv() {}

export function search_csv(column: string, value: string, hasheader: boolean) {}
