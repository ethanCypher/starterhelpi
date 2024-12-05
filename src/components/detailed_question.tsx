import React, { useState, useEffect } from "react";
import "./detailed_question.css";
import { ProgressBar } from "react-bootstrap";

const totalQuestions = 9;
function DetailedQuestions() {
  const [answers, setAnswers] = useState<string[]>(Array(9).fill(""));
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Handles input change for each question
  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Calculate progress percentage
  const calculateProgress = () => (completedQuestions / totalQuestions) * 100;

  // Update completed question count
  const updateCompletedQuestions = () => {
    const count = answers.filter((answer) => answer.trim() !== "").length;
    setCompletedQuestions(count);
  };

  // Update question count whenever answers change
  useEffect(updateCompletedQuestions, [answers]);

  // Function to format GPT response consistently
  const formatResponse = (rawResponse: string) => {
    const suggestions = rawResponse
      .split("\n")
      .filter((line) => line.trim() !== "") // Remove empty lines
      .map((line) => {
        const match = line.match(/\*\*(.+?)\*\*:?\s*(.+)/);
        if (match) {
          const title = match[1].trim();
          const description = match[2].trim();
          return `
            <p>
              <strong style="color: blue;">${title}</strong><br>
              <span style="color: black;">${description}</span>
            </p>`;
        }
        return ""; // Skip invalid lines
      })
      .join("");
    return suggestions;
  };

  // Function to call ChatGPT API
  const submitAnswers = async () => {
    const isAllAnswered = answers.every((answer) => answer.trim() !== "");
    if (!isAllAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    const isValidInput = answers.every((answer) => {
      const wordCount = answer.trim().split(/\s+/).length;
      return wordCount >= 3;
    });

    if (!isValidInput) {
      setError(
        "Some answers are too short. Please provide more detailed answers."
      );
      return;
    }

    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey) {
      setError("API key is missing. Please enter your API key in the App.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const messages = answers.map((answer, index) => ({
        role: "user",
        content: `Question ${
          index + 1
        }: ${answer}. Please provide exactly three career suggestions based on ALL question responses. Consider all responses equally. in this format: **actual title of the career not the words**: Description`,
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
                  "You are a career advisor specializing in providing detailed assessments. Consider all responses equally. Respond with exactly three career suggestions in this format exactly. Do not change the format: **actual title of the career not the words**: Description (should be about three sentences in length)",
              },
              ...messages,
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error occurred: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        setError("The API response is invalid. Please try again later.");
        return;
      }

      const rawResponse = data.choices[0].message.content;
      const formattedResponse = formatResponse(rawResponse);
      setResponse(formattedResponse);
    } catch (error: any) {
      setError(`We encountered an error: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <div className="detailed-container">
        <div className="question-container">
          <h1>Detailed Questions</h1>
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
          </div>
        )}

        {loading && (
          <div className="loading1-container">
            <p className="loading1-text">
              We’ve received your answers! Processing your response, please
              wait...
            </p>
            <video autoPlay loop muted className="loading1-video">
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
      </div>
    </div>
  );
}

export default DetailedQuestions;
