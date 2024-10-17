import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div className="App-body">
      <Container>
        <Row>
          <Col>
            <div className="Button-container">
              <h2 className="Button-title">Basic QUestion</h2>
              <p className="Button-description">
                Start with a series of basic questions to assess your knowledge.
              </p>
              {/* Button to navigate to the assessment page */}
              <a href="/basic_question">
                <Button variant="outline-light" size="lg" className="mt-3">
                  Basic Questions
                </Button>
              </a>
            </div>
          </Col>

          <Col>
            <div className="Button-container">
              <h2 className="Button-title">Detailed QUestion</h2>
              <p className="Button-description">
                Dive deeper into more detailed questions for a thorough
                assessment.
              </p>
              <a href="/detailed_question">
                <Button variant="outline-light" size="lg" className="mt-3">
                  Detailed Questions
                </Button>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
