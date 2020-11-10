import * as React from "react";
import Card from "react-bootstrap/Card";
import ResetButton from "./ResetButton";

const Fallback = () => (
  <>
    <Card.Title>Couldn't determine sentiment</Card.Title>
    <Card.Text>
      Unfortunately this site's sentiment could'nt be determined. This is likely
      to be due to lack of semantic HTML.
    </Card.Text>
    <ResetButton />
  </>
);

export default Fallback;
