import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export interface REPLFunction {
  (args: string[]): string | string[][];
}

export type HistoryElement = {
  Command: string;
  Output: string | string[][];
};

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
