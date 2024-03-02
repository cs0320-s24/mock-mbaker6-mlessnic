import "../styles/main.css";
import { HistoryElement } from "./REPL";

/**
 * Props interface for history component.
 */
interface REPLHistoryProps {
  history: HistoryElement[];
  verbose: boolean;
}
/**
 * Build the webpage using the list of history elements. List is given by REPL and built within the REPLInput.
 * @param props - Props for history component.
 * @returns {JSX.Element} the REPL history component of the page.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label={"repl-history"}>
      {props.history.map((element, idx) => (
        <div key={idx}>
          {/* If verbose flag is set, print the command and output strings */}
          {props.verbose && (
            <p>
              Command: {element.Command}
              <br />
              Output:{" "}
              {Array.isArray(element.Output)
                ? "See table below"
                : element.Output}
            </p>
          )}
          {/* Render output as a table if it's a 2D array */}
          {Array.isArray(element.Output) && (
            <table className="center">
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
}
