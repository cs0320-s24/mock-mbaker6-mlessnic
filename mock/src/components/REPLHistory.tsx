import "../styles/main.css";
import { HistoryElement } from "./REPL";

interface REPLHistoryProps {
  history: HistoryElement[];
  verbose: boolean;
  // TODO: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {

  //if (props.history === "string") {
    return (
      <div className="repl-history">
        {props.history.map((element, idx) => (
          <div key={idx}>
            {/* If verbose flag is set, print the command and output strings */}
            {props.verbose && (
              <p>
                Command: {element.Command}
                <br />
                Output: {Array.isArray(element.Output) ? "See table below" : element.Output}
              </p>
            )}
            {/* Render output as a table if it's a 2D array */}
            {Array.isArray(element.Output) && (
              <table>
                <tbody>
                  {element.Output.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Render output directly if it's a string */}
            {!Array.isArray(element.Output) && !props.verbose && (
              <p>{element.Output}</p>
            )}
          </div>
        ))}
      </div>
    );
  // } else {
  //   //if output is a list of list of strings: return a html table
  //   return (
  //     <div className="repl-history">
  //       {props.history.map((output, idx) => (
  //         <div key={idx}>
  //           {Array.isArray(output) ? (
  //             // If output is a 2D array, display each row as a paragraph
  //             output.map((row, rowIdx) => <p key={rowIdx}>{row.join(", ")}</p>)
  //           ) : (
  //             // If output is a string, display it as a paragraph
  //             <p>{output}</p>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
}
