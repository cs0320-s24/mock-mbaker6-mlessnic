import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export interface REPLFunction {
  (args: string[]): string | string[][];
}

const commandRegistry: Record<string, REPLFunction> = {};

function registerCommand(commandName: string, func: REPLFunction){
  commandRegistry[commandName] = func;
}

function executeCommand(commandName: string, args: string[]){
  
}

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<string[]>([]);
  const [verbose, setVerbose] = useState<boolean>(false);

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory history={history} verbose={verbose} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        verbose={verbose}
        setVerbose={setVerbose}
      />
    </div>
  );
}

const exampleCSV1 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
];

const exampleCSV2 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [100, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [1000, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [10000, 2000, 30, 40, 50, 60, 70, 80, 90, 100],
];

const record = {
  "datasource1.csv": exampleCSV1,
  "datasource2.csv": exampleCSV2,
};
