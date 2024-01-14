import { Dialog, Heading, Pane, Text } from "evergreen-ui";
import { useRef, useState } from "react";

import Board from "./components/Board";
import Navbar from "./components/Navbar";

// TODO: Maybe limit list to 4-6 letter words?
import { words } from "./assets/words.json";

export default function App() {
  const word = useRef(words[Math.floor(Math.random() * words.length)]);

  const [showLose, setShowLose] = useState(false);
  const [showWin, setShowWin] = useState(false);

  return (
    <Pane height="100vh" width="100vw" display="flex" flexDirection="column">
      <Navbar
        heading="Wordlike"
        subtitle={
          <>
            An NxN Wordle Clone by{" "}
            <Heading is="a" size={100} href="https://github.com/jkmuriithi">
              jkmuriithi
            </Heading>
          </>
        }
      />
      <Pane
        height="100%"
        width="100%"
        display="flex"
        background="gray900"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Board
          word={word.current}
          alphabetDefinition={/^[A-Za-z]*$/}
          onWin={() => setShowWin(true)}
          onLose={() => setShowLose(true)}
        />
      </Pane>
      <Dialog
        title="You lost!"
        isShown={showLose}
        intent="danger"
        confirmLabel="Try Again"
        hasCancel={false}
        onCloseComplete={() => location.reload()}
      >
        <Text>Darn! Better luck next time!</Text>
        <Heading marginTop={20} size={800}>
          {word.current.toUpperCase()}
        </Heading>
      </Dialog>
      <Dialog
        title="You won!"
        isShown={showWin}
        intent="success"
        confirmLabel="Try Again"
        hasCancel={false}
        onCloseComplete={() => location.reload()}
      >
        <Text>Congratulations! You correctly guessed the word!</Text>
        <Heading marginTop={20} size={800}>
          {word.current.toUpperCase()}
        </Heading>
      </Dialog>
    </Pane>
  );
}
