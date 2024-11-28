import React, { useState, useEffect } from "react";
import "./detailed_question.css";
import { ProgressBar } from "react-bootstrap";

const totalQuestions = 9;

function DetailedQuestions() {
  const [answers, setAnswers] = useState<string[]>(Array(9).fill(""));
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Handles input change for each question
  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // State to track completed questions
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Progress calculation
  const calculateProgress = () => (completedQuestions / totalQuestions) * 100;

  // Function to check if a question is answered
  const updateCompletedQuestions = () => {
    let count = answers.filter((answer) => answer.trim() !== "").length;
    setCompletedQuestions(count);
  };

  // Update the completed question count whenever answers change
  useEffect(updateCompletedQuestions, [answers]);

  // checking API key and displaying error message on the UI
  const [error, setError] = useState<string | null>(null); // State to track errors

  // Function to call ChatGPT API
  const submitAnswers = async () => {
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey) {
      setError("API key is missing. Please enter your API key in the App.");
      //alert("Please enter your API key in the App.");
      return;
    }
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const messages = answers.map((answer, index) => ({
        role: "user",
        content: `Question ${
          index + 1
        }: ${answer},Please provide a detailed assessment of this response, including how it relates to potential career paths and advice on next steps.`,
      }));

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a career advisor specializing in career guidance based on user responses. give me a list of three best career path based on the user response. each one should be one paragraph and  the titles of each career should headings and the description of the career should be below the heading.",
                //"You are a career advisor specializing in providing detailed assessments based on user responses. Give brief feedback and career guidance based on the answers provided.",
              },
              ...messages,
            ],
          }),
        }
      );

      // error handling
      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        throw new Error(`Server error occurred: ${errorMessage}`);
      }

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        setError("The API response is invalid. Please try again later.");
        return;
      }
      const rawResponse = data.choices[0].message.content;

      // Process the GPT response into separate paragraphs
      const formattedResponse = rawResponse
        .split("\n") // Split response into lines
        .filter((line: string) => line.trim() !== "") // Remove empty lines
        .map(
          (line: string, index: string) => `<p><strong>${line}</strong> </p>`
        ) // Wrap each suggestion with a title
        .join(""); // Combine into a single HTML string

      setResponse(formattedResponse);
    } catch (error: any) {
      setError(
        `We encountered an error: ${error.message}. Please try again later.`
      );
      //console.error("Error fetching data:", error);
      //setResponse(
      //  `<p class="error-text">We encountered an error: ${error.message}. Please try again later.</p>`
      //);
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <div className="background-container">
      <div className="detailed-container">
        <div className="question-container">
          <h1>Detailed Question</h1>
          <ProgressBar
            className="custom1-progress"
            now={calculateProgress()}
            label={`${calculateProgress().toFixed(0)}%`}
          />
          {[
            "What tasks or activities do you find most fulfilling?",
            "How do you prefer to interact with others in a work environment?",
            "What are your strongest skills or talents?",
            "Describe a work environment where you thrive.",
            "What type of problems do you enjoy solving?",
            "How important are salary, job security, work-life balance, and advancement opportunities?",
            "What kind of contribution do you hope to make through your work?",
            "Describe a past project or task that you felt extremely proud of.",
            "What did you want to be growing up as a kid? Explain why.",
          ].map((question, index) => (
            <div key={index} className="question">
              <label htmlFor={`question${index + 1}`}>
                Question {index + 1}: {question}
              </label>
              <textarea
                id={`question${index + 1}`}
                name={`question${index + 1}`}
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              ></textarea>
            </div>
          ))}
          <button onClick={submitAnswers} className="submit-button">
            Submit for Assessment
          </button>
        </div>

        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button onClick={submitAnswers} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <p className="loading-text">
              We’ve received your answers! Processing your response, please
              wait...
            </p>
            <video autoPlay loop muted className="loading-video">
              <source src="./Pictures/butterfly.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {!loading && !error && response && (
          <div className="response-container">
            <h2>Career Assessment Result</h2>
            <div dangerouslySetInnerHTML={{ __html: response }}></div>
          </div>
        )}
        <div>
          <br></br>
          <br></br>
          <br></br>

          <br></br>

          <br></br>
        </div>
      </div>
    </div>
  );
}

export default DetailedQuestions;
