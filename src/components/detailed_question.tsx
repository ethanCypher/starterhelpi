import React, { useState, useEffect } from "react";
import "./detailed_question.css";
import { ProgressBar } from "react-bootstrap";

const totalQuestions = 9;

function DetailedQuestions() {
  const [answers, setAnswers] = useState<string[]>(Array(9).fill(""));
  const [response, setResponse] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false); // Loading state

  //const [progressPercentage, setProgress] = useState<Number>(0);

  // Handles input change for each question
  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    // const filledAnswers = newAnswers.filter(answer => answer.trim() !== "").length;
    // const progressPercentage = Math.round((filledAnswers/newAnswers.length) * 100);
    // setProgress(progressPercentage);
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
    // Validate if all questions are answered
    const isAllAnswered = answers.every((answer) => answer.trim() !== "");
    if (!isAllAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    // Validate input quality (minimum word count, basic sanity checks)
    const isValidInput = answers.every((answer) => {
      const wordCount = answer.trim().split(/\s+/).length;
      return wordCount >= 3; // Example: Require at least 3 words
    });

    if (!isValidInput) {
      setError(
        "Some answers are too short or do not make sense. Please provide more detailed and meaningful answers."
      );
      return;
    }
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey) {
      setError("API key is missing. Please enter your API key in the App.");
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
                  "You are a career advisor specializing in providing detailed assessments based on user responses. Give in-depth feedback and career guidance that recommends 3 career options based on all of the responses provided. Use this format: \n\n### Title\nDescription. \n\nEach title should be a job name, and each description should explain why that job was selected.",
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
        .split("\n\n") // Split response into paragraphs (titles + descriptions are separated by double newlines)
        .filter((paragraph: string) => paragraph.trim() !== "") // Remove empty paragraphs
        .map((paragraph: string) => {
          // Split the paragraph into title and description
          const [title, ...descriptionParts] = paragraph.split("\n");
          const cleanTitle = title.replace(/^###\s*/, ""); // Remove '###' and any leading spaces
          const description = descriptionParts.join(" "); // Combine the remaining lines into the description
          return `
      <p>
        <strong style="color: blue;">${cleanTitle.trim()}</strong>
        <br>
        ${description.trim()}
      </p>
    `;
        })
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
            {/* <button onClick={submitAnswers} className="retry-button">
              Retry
            </button> */}
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
