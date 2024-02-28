import "../styles/main.css";

interface REPLHistoryProps {
  history: (string|string[][])[];
  verbose: boolean;
  // TODO: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {
  if (props.verbose){
    return (
      <div className="repl-history">
      {props.history.map((output, idx) => (
         <div key={idx}>
         {Array.isArray(output) ? (
           // If output is a 2D array, display each row as a paragraph
           output.map((row, rowIdx) => (
             <p key={rowIdx}>{row.join(", ")}</p>
           ))
         ) : (
           // If output is a string, display it as a paragraph
           <p>Output: {output}</p>
         )}
       </div>
        
      ))}
      {/*TODO: add display of output here */}
    </div>
    );
  } else{
    return (
      <div className="repl-history">
        {props.history.map((output, idx) => (
           <div key={idx}>
           {Array.isArray(output) ? (
             // If output is a 2D array, display each row as a paragraph
             output.map((row, rowIdx) => (
               <p key={rowIdx}>{row.join(", ")}</p>
             ))
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
