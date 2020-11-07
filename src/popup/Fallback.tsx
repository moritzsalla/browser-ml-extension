import * as React from "react";
import Card from "react-bootstrap/Card";
import Fallback from "./Fallback";
import ResetButton from "./ResetButton";

const Fallback = () => (
  <Card style={{ width: "18rem" }} className="m-1 shadow border-0 rounded">
    <Card.Body>
      <Card.Title>Sentiment Analysis</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Check a website's sentiment using deep learning
      </Card.Subtitle>
      <Card.Text>
        Unfortunately this site's sentiment could'nt be determined. This is
        likely to be due to lack of semantic HTML.
      </Card.Text>
      <ResetButton />
    </Card.Body>
  </Card>
);

export default Fallback;
