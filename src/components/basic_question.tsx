import "./basic_question.css";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

// new added
type AnswerType = {
  personality: string[];
  taskOrganizing: string[];
  workEnviroment: string[];
  favSubject: string[];
  motivation: string[];
  activity: string[];
  challenge: string[];
  decision: string[];
  workPlace: string[];
  introvertExtrovert: string;
};
//new newly added
const totalQuestions = 10;

function BasicQuestions() {
  // Separate state for each dropdown
  const [isPersonalityOpen, setIsPersonalityOpen] = useState(false);
  const [isTaskOrganizingOpen, setIsTaskOrganizingOpen] = useState(false);
  const [isYourFavSubjectOpen, setIsYourFavSubject] = useState(false);
  const [isWorkEnviroment, setIsWorkEnviroment] = useState(false);
  const [isMotivation, setIsMotivation] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  const [isChallenge, setIsChallenge] = useState(false);
  const [isDecision, setIsDecision] = useState(false);
  const [isWorkPlace, setIsWorkPlace] = useState(false);

  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // checking API key and displaying error message on the UI
  const [error, setError] = useState<string | null>(null); // State to track errors

  //Newly added
  // Separate state for each dropdown and checkboxes
  const [answers, setAnswers] = useState<AnswerType>({
    personality: [],
    taskOrganizing: [],
    workEnviroment: [],
    favSubject: [],
    motivation: [],
    activity: [],
    challenge: [],
    decision: [],
    workPlace: [],
    introvertExtrovert: "",
  });

  // State to track completed questions
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Progress calculation
  const calculateProgress = () => (completedQuestions / totalQuestions) * 100;

  // Determine if the submit button should be disabled
  const isSubmitDisabled = calculateProgress() < 100;

  //adding it new for disabling the submit button
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Function to check if a question is answered
  const updateCompletedQuestions = () => {
    let count = 0;
    for (const key in answers) {
      if (
        key !== "introvertExtrovert" &&
        answers[key as keyof Omit<AnswerType, "introvertExtrovert">].length > 0
      ) {
        count++;
      } else if (key === "introvertExtrovert" && answers.introvertExtrovert) {
        count++;
      }
    }
    setCompletedQuestions(count);
  };

  //console.log(completion.choices[0].message);
  //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)

  // const handleSelect = (eventKey: string | null) => {
  //   if (eventKey) {
  //     setSelectedOption(eventKey);

  //   }
  //   setCompletedQuestions(count);
  // };

  // Update the completed question count whenever answers change
  useEffect(updateCompletedQuestions, [answers]);

  //arrays of answers of each question so the function can map through each of them.
  const personalities = [
    "The Adventurer",
    "The Planner",
    "The Dreamer",
    "The Leader",
    "The Peacemaker",
    "The Achiever",
    "The Free Spirit",
    "The Analyst",
  ];

  const Tasks = [
    "Very Organized",
    "Somewhat Organized",
    "Not Very Organized",
    "Just Go with the Flow",
    "Organized Chaos",
  ];

  const environments = ["Office-based", "Remote", "Out-door", "A mix of all"];

  const motivations = [
    "Learning new skills",
    "Helping others",
    "Working on creative projects",
    "Solving problems",
    "Working with a team",
    "Taking on challenges",
    "Earning rewards or recognition",
  ];

  const activities = [
    "Working with technology",
    "Exploring new places",
    "Teaching",
    "Building or fixing things",
    "Writing or storytelling",
    "Working with numbers or data",
    "Cooking or preparing meals",
    "Playing sports or staying active",
  ];

  const challenges = [
    "Solving complex problems",
    "Meeting new people and networking",
    "Creating innovative solutions",
    "Managing multiple tasks at once",
  ];

  const decisions = [
    "based on logic and facts",
    "trust my instincts",
    "seek advice from others",
    "carefully think through all choices",
  ];

  const workplace = [
    "Welcome change and adapt easily",
    "Like to keep things the same",
    "Find it hard but try to adjust",
    "Do not like change and feel uneasy",
  ];

  const subjects = [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Art",
    "Geography",
    "Literature",
    "Computer Science",
    "Economics",
    "Psychology",
    "Philosophy",
    "Music",
    "Physical Education",
  ];

  //Newly added
  // Function to handle checkbox selection
  const handleCheckboxChange = (
    question: keyof Omit<AnswerType, "introvertExtrovert">,
    value: string
  ) => {
    setAnswers((prevAnswers) => {
      const currentValues = [...prevAnswers[question]];
      const valueIndex = currentValues.indexOf(value);

      if (valueIndex === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(valueIndex, 1);
      }
      return {
        ...prevAnswers,
        [question]: currentValues,
      };
    });
  };
  // Function to handle dropdown selection
  const handleSelect = (value: string | null) => {
    if (value) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        introvertExtrovert: value,
      }));
    }
  };

  //this is used for reset the questions
  const resetAllDropdowns = () => {
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    setIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  /*const handleSubmit = () => {
    console.log("Form Submitted!");
    resetAllDropdowns();  // Reset all dropdowns after submission
  };
  */
  // Toggle function that resets all dropdowns and toggles the specific one
  const toggleDropdown = (
    setter: (value: boolean) => void,
    isOpen: boolean
  ) => {
    resetAllDropdowns();
    setter(!isOpen);
  };

  // Usage for each dropdown toggle
  const togglePersonalityDropdown = () =>
    toggleDropdown(setIsPersonalityOpen, isPersonalityOpen);
  const toggleTaskOrganizingDropdown = () =>
    toggleDropdown(setIsTaskOrganizingOpen, isTaskOrganizingOpen);
  const toggleFavSubject = () =>
    toggleDropdown(setIsYourFavSubject, isYourFavSubjectOpen);
  const toggleWorkEnviroment = () =>
    toggleDropdown(setIsWorkEnviroment, isWorkEnviroment);
  const toggleMotivation = () => toggleDropdown(setIsMotivation, isMotivation);
  const toggleActivity = () => toggleDropdown(setIsActivity, isActivity);
  const toggleChallenge = () => toggleDropdown(setIsChallenge, isChallenge);
  const toggleDecision = () => toggleDropdown(setIsDecision, isDecision);
  const toggleWorkPlace = () => toggleDropdown(setIsWorkPlace, isWorkPlace);

  // implementing GPT

  const [response, setResponse] = useState<string>("");

  //Call ChatGPT API
  const submitAnswers = async () => {
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey) {
      setError("API key is missing. Please enter your API key in the App.");
      return;
    }
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    //adding it new for disabling the submit button
    setIsSubmitted(true); // Disable the button after it's clicked

    try {
      const messages = Object.keys(answers).map((key, index) => {
        const answerValue = answers[key as keyof AnswerType];
        const responseText = Array.isArray(answerValue)
          ? answerValue.join(", ")
          : answerValue;
        return {
          role: "user",
          content: `Question ${
            index + 1
          }: ${responseText}. Please provide exactly three career suggestions based on ALL question responses. Consider all responses equally. in this format: **actual title of the career not the words**: Description`,
        };
      });

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

      const data = await response.json();
      const rawResponse = data.choices[0].message.content;
      setResponse(formatResponse(rawResponse));
    } catch (error) {
      setError(
        "We encountered an error! You are either missing your API key or your API key is invalid. Please type your API key, and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format GPT response
  const formatResponse = (rawResponse: string) => {
    const suggestions = rawResponse
      .split("\n")
      .filter((line) => line.trim() !== "")
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
        return "";
      })
      .join("");
    return suggestions;
  };

  return (
    <div className="basic-container">
      <div className="main-container">
        <h1>Basic Question</h1>
        <div className="question">
          {/* Personality Dropdown */}
          <ProgressBar
            now={calculateProgress()}
            label={`${calculateProgress().toFixed(0)}%`}
          />
          <label>Question 1</label>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={togglePersonalityDropdown}
            >
              Which of these best represents your personality?
            </button>
            {isPersonalityOpen && (
              <div className="checkbox-group">
                {personalities.map((personality) => (
                  <label key={personality}>
                    <input
                      type="checkbox"
                      checked={answers.personality.includes(personality)}
                      onChange={() =>
                        handleCheckboxChange("personality", personality)
                      }
                    />
                    {personality}
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Task Organizing Dropdown (Question 2) */}
          <label>Question 2</label>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={toggleTaskOrganizingDropdown}
            >
              How do you typically manage your tasks and projects?
            </button>
            {isTaskOrganizingOpen && (
              <div className="checkbox-group">
                {Tasks.map((task) => (
                  <label key={task}>
                    <input
                      type="checkbox"
                      checked={answers.taskOrganizing.includes(task)}
                      onChange={() =>
                        handleCheckboxChange("taskOrganizing", task)
                      }
                    />
                    {task}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Work Environment Dropdown (Question 3) */}
          <label>Question 3</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleWorkEnviroment}>
              What type of work environment do you prefer?
            </button>
            {isWorkEnviroment && (
              <div className="checkbox-group">
                {environments.map((environment) => (
                  <label key={environment}>
                    <input
                      type="checkbox"
                      checked={answers.workEnviroment.includes(environment)}
                      onChange={() =>
                        handleCheckboxChange("workEnviroment", environment)
                      }
                    />
                    {environment}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 4</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleFavSubject}>
              Which subject area do you like the most?
            </button>
            {isYourFavSubjectOpen && (
              <div className="checkbox-group">
                {subjects.map((subject) => (
                  <label key={subject}>
                    <input
                      type="checkbox"
                      checked={answers.favSubject.includes(subject)}
                      onChange={() =>
                        handleCheckboxChange("favSubject", subject)
                      }
                    />
                    {subject}
                  </label>
                ))}
              </div>
            )}
          </div>

          <label>Question 5</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleMotivation}>
              What motivates you at work?
            </button>
            {isMotivation && (
              <div className="checkbox-group">
                {motivations.map((motivation) => (
                  <label key={motivation}>
                    <input
                      type="checkbox"
                      checked={answers.motivation.includes(motivation)}
                      onChange={() =>
                        handleCheckboxChange("motivation", motivation)
                      }
                    />
                    {motivation}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 6</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleActivity}>
              Which of the following activities do you enjoy the most?
            </button>
            {isActivity && (
              <div className="checkbox-group">
                {activities.map((activity) => (
                  <label key={activity}>
                    <input
                      type="checkbox"
                      checked={answers.activity.includes(activity)}
                      onChange={() =>
                        handleCheckboxChange("activity", activity)
                      }
                    />
                    {activity}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 7</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleChallenge}>
              What type of challenges do you enjoy at work?
            </button>
            {isChallenge && (
              <div className="checkbox-group">
                {challenges.map((challenge) => (
                  <label key={challenge}>
                    <input
                      type="checkbox"
                      checked={answers.challenge.includes(challenge)}
                      onChange={() =>
                        handleCheckboxChange("challenge", challenge)
                      }
                    />
                    {challenge}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 8</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDecision}>
              How do you handle decision-making?
            </button>
            {isDecision && (
              <div className="checkbox-group">
                {decisions.map((decision) => (
                  <label key={decision}>
                    <input
                      type="checkbox"
                      checked={answers.decision.includes(decision)}
                      onChange={() =>
                        handleCheckboxChange("decision", decision)
                      }
                    />
                    {decision}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 9</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleWorkPlace}>
              How do you respond to changes in the workplace?
            </button>
            {isWorkPlace && (
              <div className="checkbox-group">
                {workplace.map((response) => (
                  <label key={response}>
                    <input
                      type="checkbox"
                      checked={answers.workPlace.includes(response)}
                      onChange={() =>
                        handleCheckboxChange("workPlace", response)
                      }
                    />
                    {response}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Question 10</label>
          <div style={{ width: "100%" }}>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle style={{ color: "black" }}>
                {answers.introvertExtrovert ||
                  "Which one of the following describes you the most?"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Introvert">Introvert</Dropdown.Item>
                <Dropdown.Item eventKey="Extrovert">Extrovert</Dropdown.Item>
                <Dropdown.Item eventKey="Both">Both</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {answers.introvertExtrovert && (
              <div style={{ marginTop: "5%", width: "120%" }}>
                {/* <strong>Selected Option:</strong> {answers.introvertExtrovert} */}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={submitAnswers}
          className="submit-button"
          disabled={isSubmitDisabled || isSubmitted} // Disable if progress < 100% or already submitted
        >
          Submit for Assessment
        </Button>{" "}
      </div>
      {/* Submit button */}
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
        <div className="response1-container">
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
        <br></br>
      </div>
    </div>
  );
}

export default BasicQuestions;
