import { load_csv } from "./CSVFunctions";
import { view_csv } from "./CSVFunctions";
import { search_csv } from "./CSVFunctions";
import { REPLFunction } from "./REPL";

const commandRegistry: Record<string, REPLFunction> = {};

// const commandRegistry = new Map();
// commandRegistry.set("load", load_csv(filepath));
// commandRegistry.set("view", view_csv);
// commandRegistry.set("serach", search_csv("string", "string"));

function registerCommand(commandName: string, func: REPLFunction) {
  commandRegistry.set(commandName, func);
}

function executeCommand(commandName: string, args: string[]) {
  const func = commandRegistry[commandName];
  if (func) {
    return func(args);
  } else {
    return `Command "${commandName}" not found`;
  }
}
