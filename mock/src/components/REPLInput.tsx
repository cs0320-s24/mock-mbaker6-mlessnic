import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { HistoryElement } from "./REPL";
import {
  populateCommandRegistry,
  commandRegistry,
  executeCommand,
} from "./Commands";

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
  populateCommandRegistry();

  const handleSubmit = () => {
    //console.log("Command string: " + commandString);
    const args = commandString.split(/\s+/); // Split command string into arguments
    const commandName = args.shift(); // Extract the command name (first index of list)

    if (commandName) {
      if (commandString === "mode") {
        //console.log("boolean evaluated true");
        props.setVerbose(!props.verbose);
      } else {
        //const output = executeCommand(commandName, args);

        const func = commandRegistry.get(commandName);
        if (func) {
          const output = func(args);
          if (props.verbose) {
            let HistoryElement = {
              Command: "Command: " + commandName,
              Output: "Output: " + output,
            };
            props.setHistory([...props.history, HistoryElement]);
          } else {
            let HistoryElement = {
              Command: commandName,
              Output: output,
            };
            props.setHistory([...props.history, HistoryElement.Output]);
          }
        } else {
          let HistoryElement = {
            Command: commandName,
            Output: "Command" + commandName + "not found",
          };
          props.setHistory([...props.history, HistoryElement.Output]);
        }
      }
    } else {
      let HistoryElement = {
        Command: commandName,
        Output: "No command given",
      };
      props.setHistory([...props.history, HistoryElement.Output]);
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
