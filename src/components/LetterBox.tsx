import { Heading, HeadingOwnProps, Pane, PaneOwnProps } from "evergreen-ui";

interface LetterBoxProps {
  sizePx?: number;
  textSize?: HeadingOwnProps["size"];
  textColor?: string;
  backgroundColor?: PaneOwnProps["background"];
  letter?: string;
  marginPx?: number;
}

export default function LetterBox(props: LetterBoxProps) {
  if (props.letter && props.letter.length > 1) {
    console.error("LetterBox received more than one character");
  }

  return (
    <Pane
      width={props.sizePx ?? 50}
      height={props.sizePx ?? 50}
      background={props.backgroundColor ?? "tint2"}
      margin={props.marginPx ?? 5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      userSelect="none"
    >
      <Heading color={props.textColor} size={props.textSize ?? 700}>
        {props.letter}
      </Heading>
    </Pane>
  );
}
