import "../styles/main.css";
import { HistoryElement } from "./REPL";

interface REPLHistoryProps {
  history: HistoryElement[];
  verbose: boolean;
  // TODO: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {
  //if (props.verbose) {
  if (props.history === "string") {
    return (
      //if output (history) is string
      <div className="repl-history">
        {props.history.map((output, idx) => (
          <p key={idx}>Output: {output}</p>
        ))}
        {/*TODO: add display of output here */}
      </div>
    );
  } else {
    //if output is a list of list of strings: return a html table
    return (
      <div className="repl-history">
        {props.history.map((command, idx) => (
          <p key={idx}>{command}</p>
        ))}
        {/*TODO: add display of output here */}
      </div>
    );
  }
}
