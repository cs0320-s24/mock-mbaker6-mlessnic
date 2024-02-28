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
        {props.history.map((output, idx) => (
          <div key={idx}>
            {Array.isArray(output) ? (
              // If output is a 2D array, display each row as a paragraph
              output.map((row, rowIdx) => <p key={rowIdx}>{row.join(", ")}</p>)
            ) : (
              // If output is a string, display it as a paragraph
              <p>{output}</p>
            )}
          </div>
        ))}
        {/*TODO: add display of output here */}
      </div>
    );
  }
}
