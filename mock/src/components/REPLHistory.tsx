import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
  verbose: boolean;
  // TODO: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {
  if (props.verbose){
    return (
      <div className="repl-history">
      {props.history.map((output, idx) => (
        <p key={idx}>Output: {output}</p>
        
      ))}
      {/*TODO: add display of output here */}
    </div>
    );
  } else{
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
