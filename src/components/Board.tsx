import { Pane } from "evergreen-ui";
import { FormEvent, useState } from "react";

import Row from "./Row";

interface BoardProps {
  word: string;
  alphabetDefinition: RegExp;
  onWin?: () => void;
  onLose?: () => void;
}

/** Displays the game board and handles game logic internally. */
export default function Board(props: BoardProps) {
  const [activeRow, setActiveRow] = useState(0);

  const n = props.word.length;
  const word = props.word.toUpperCase();

  const onRowSubmit = (e: FormEvent<HTMLFormElement>, rowVal: string) => {
    e.preventDefault();
    if (rowVal.length < n) {
      return;
    }

    if (rowVal === word) {
      props.onWin && props.onWin();
    } else if (activeRow < n) {
      setActiveRow(activeRow + 1);
    } else {
      props.onLose && props.onLose();
    }
  };

  const rows = [];
  for (let i = 0; i <= n; i++) {
    rows.push(
      <Row
        key={i}
        word={word}
        isActive={activeRow === i}
        onSubmit={onRowSubmit}
        alphabetDefinition={props.alphabetDefinition}
      />,
    );
  }

  return (
    <Pane display="flex" flexDirection="column">
      {rows}
    </Pane>
  );
}
