import { Pane } from "evergreen-ui";
import React, { FormEvent, useEffect, useRef, useState } from "react";

import LetterBox from "./LetterBox";

interface RowProps {
  word: string;
  alphabetDefinition: RegExp;
  onSubmit: (e: FormEvent<HTMLFormElement>, rowVal: string) => void;
  isActive: boolean;
}

const ROW_COLORS = {
  INPUT_ACTIVE: "blue200",
  INPUT_INACTIVE: "blue400",
  CHAR_IN_WORD_HERE: "green",
  CHAR_IN_WORD_NOT_HERE: "orange500",
  CHAR_NOT_IN_WORD: "gray",
};

export default function Row(props: RowProps) {
  const rowInput = useRef<HTMLInputElement>(null);
  const [rowVal, setRowVal] = useState("");

  const setFocus = () => {
    if (props.isActive) {
      rowInput.current?.focus();
    } else {
      rowInput.current?.blur();
    }
  };

  // Refocus the active row every time the board changes
  useEffect(setFocus);

  const n = props.word.length;

  const letterBackgroundColor = (idx: number) => {
    if (props.isActive) {
      return ROW_COLORS.INPUT_ACTIVE;
    }
    if (rowVal.length < idx + 1) {
      return ROW_COLORS.INPUT_INACTIVE;
    }

    const char = rowVal.charAt(idx);
    if (char === props.word.charAt(idx)) {
      return ROW_COLORS.CHAR_IN_WORD_HERE;
    }

    const charCountInWord = countChar(props.word, char);
    const charCountAtLetter = countCharUntil(rowVal, char, idx + 1);
    const charMatches = countCharMatches(rowVal, props.word, char);
    if (
      charCountInWord > 0 &&
      charCountAtLetter <= charCountInWord - charMatches
    ) {
      return ROW_COLORS.CHAR_IN_WORD_NOT_HERE;
    }

    return ROW_COLORS.CHAR_NOT_IN_WORD;
  };

  const boxes = [];
  for (let i = 0; i < n; i++) {
    boxes.push(
      <LetterBox
        key={i}
        sizePx={65}
        marginPx={5}
        textSize={700}
        letter={rowVal[i]}
        backgroundColor={letterBackgroundColor(i)}
      />,
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value.trim();

    if (
      props.isActive &&
      change.length <= n &&
      props.alphabetDefinition.test(change)
    ) {
      setRowVal(change.toUpperCase());
    }
  };

  return (
    <Pane display="flex" onClick={setFocus}>
      {boxes}
      <form
        autoComplete="off"
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
        }}
        onSubmit={(e) => {
          props.onSubmit(e, rowVal);
          // Unfocus this input if it's inactive to prevent future
          // submissions on this row affecting the board state
          setFocus();
        }}
      >
        <label htmlFor="word-row">Word Row</label>
        <input
          id="word-row"
          type="text"
          ref={rowInput}
          value={rowVal}
          onChange={handleChange}
        ></input>
      </form>
    </Pane>
  );
}

/**
 * Counts the number of times `char` occurs in s from 0 to `untilIndex`,
 * exclusive.
 */
const countCharUntil = (s: string, char: string, untilIndex: number) => {
  let ans = 0;

  for (let i = 0; i < untilIndex; ++i) {
    if (s[i] === char) {
      ++ans;
    }
  }

  return ans;
};

const countChar = (s: string, char: string) =>
  countCharUntil(s, char, s.length);

/**
 * Counts the number of times `char` occurs at the same index in both
 * `s` and `goal`. Assumes `s.length` < `goal.length`.
 */
const countCharMatches = (s: string, goal: string, char: string) => {
  let ans = 0;

  for (let i = 0; i < s.length; ++i) {
    if (s.charAt(i) === char && goal.charAt(i) === char) {
      ++ans;
    }
  }

  return ans;
};
