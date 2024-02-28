import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { HistoryElement } from "./REPL";

interface REPLInputProps {
  history: HistoryElement[];
  setHistory: Dispatch<SetStateAction<HistoryElement[]>>;

  verbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
  //handleCommand: Function;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  

  //populate command map with base functions then call executefunction(command) from map

  const handleSubmit = () => {
  //console.log("Command string: " + commandString);
  const args = commandString.split(/\s+/); // Split command string into arguments
  const commandName = args.shift(); // Extract the command name (first index of list)

  if (commandName) {
    if (commandString === "mode") {
      //console.log("boolean evaluated true");
      props.setVerbose(!props.verbose);
    } else {
      const output = executeCommand(commandName, args);
      if (props.verbose) {
        props.setHistory([...props.history, "Command: " + commandString + "\n" + "Output: " + output]);
      } else {
        props.setHistory([...props.history, output])
      }
    }
     // Execute the command  
  } else {
    props.setHistory([...props.history, "No command given"]);
  }

  
  //props.setHistory([...props.history, commandString]);
  //props.handleCommand(commandString);
  setCommandString("");
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>

      <button aria-label={"Submit button"} onClick={handleSubmit}>
        Submit
        {/* Count is {count} */}
      </button>
    </div>
  );
}
