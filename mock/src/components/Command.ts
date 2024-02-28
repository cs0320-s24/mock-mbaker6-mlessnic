// import { load_csv } from "./CSVFunctions";
// import { view_csv } from "./CSVFunctions";
// import { search_csv } from "./CSVFunctions";
import { REPLFunction } from "./REPL";

//const commandRegistry: Record<string, REPLFunction> = {};

const commandRegistry = new Map();
commandRegistry.set("load", load_csv);
commandRegistry.set("view", view_csv);
commandRegistry.set("search", search_csv);

function registerCommand(commandName: string, func: REPLFunction) {
  commandRegistry.set(commandName, func);
}

export function executeCommand(commandName: string, args: string[]) {
  const func = commandRegistry.get(commandName);
  if (func) {
    return func(args);
  } else {
    return `Command "${commandName}" not found`;
  }
}

export function load_csv(filepath: string) {}

export function view_csv() {}

export function search_csv(column: string, value: string, hasheader: boolean) {}
