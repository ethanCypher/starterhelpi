import React, { useState } from "react";
import "./detailed_question.css";

function DetailedQuestions() {
  const [answers, setAnswers] = useState<string[]>(Array(9).fill(""));
  const [response, setResponse] = useState<string>("");

  // Handles input change for each question
  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to call ChatGPT API
  const submitAnswers = async () => {
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey) {
      alert("Please enter your API key in the App.");
      return;
    }

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
                  "You are a career advisor specializing in career guidance based on user responses. Give a single career field and 3 career path suggestions based on the combination of the answers provided",
                //"You are a career advisor specializing in providing detailed assessments based on user responses. Give brief feedback and career guidance based on the answers provided.",
              },
              ...messages,
            ],
          }),
        }
      );

      const data = await response.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="detailed-container">
      <div className="question-container">
        <h1>Detailed Question Page</h1>
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

      {response && (
        <div className="response-container">
          <h2>Career Assessment Result</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default DetailedQuestions;
