import { Heading, Pane } from "evergreen-ui";
import { ReactNode } from "react";

interface NavbarProps {
  heading: ReactNode;
  subtitle?: ReactNode;
}

export default function Navbar(props: NavbarProps) {
  const { heading, subtitle } = props;
  return (
    <Pane
      background="gray50"
      borderBottom
      display="flex"
      padding="1em"
      alignItems="center"
      justifyContent="center"
    >
      <Pane display="flex" flexDirection="column" alignItems="center">
        <Heading size={800}>{heading}</Heading>
        {subtitle && <Heading size={100}>{subtitle}</Heading>}
      </Pane>
    </Pane>
  );
}
