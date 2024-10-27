import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="App-body">
      <div className="animated-title">
        {/* Or use a video tag for MP4 */}
        {<video src="/Pictures/Title.mp4" autoPlay loop muted />}
      </div>

      <Container>
        <Row>
          <Col>
            <div className="Button-container">
              <h2 className="Button-title">Basic Question</h2>
              <p className="Button-description">
                Start with a series of basic questions to assess your knowledge.
              </p>
              {/* Button to navigate to the assessment page */}
              {/* <a href="/basic_question"> */}
              <Button
                className="custom-button"
                size="lg"
                onClick={() => {
                  navigate("/basic_question");
                }}
              >
                Basic Questions
              </Button>
              {/* </a> */}
            </div>
          </Col>

          <Col>
            <div className="Button-container">
              <h2 className="Button-title">Detailed Question</h2>
              <p className="Button-description">
                Dive deeper into more detailed questions for a thorough
                assessment.
              </p>

              <Button
                className="custom-button"
                size="lg"
                onClick={() => {
                  navigate("/detailed_question");
                }}
              >
                Detailed Questions
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
