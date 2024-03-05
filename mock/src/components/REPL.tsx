import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * Function type for REPL commands.
 * @typedef {function} REPLFunction
 * @param {string[]} args - Arguments passed to the command.
 * @returns {string|string[][]} - Output of the command.
 */

export interface REPLFunction {
  (args: string[]): string | string[][];
}

/**
 * Type definition for history element.
 * @typedef {Object} HistoryElement
 * @property {string} Command - The command string.
 * @property {string|string[][]} Output - The output of the command.
 */
export type HistoryElement = {
  Command: string;
  Output: string | string[][];
};

/**
 * REPL component for building a REPL interface, passing information from the input to the history section.
 * @returns {JSX.Element} - The REPL component JSX element.
 */
export default function REPL() {
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [verbose, setVerbose] = useState<boolean>(false);

  return (
    <div className="repl">
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
