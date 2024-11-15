import "./basic_question.css";
import { Button, ProgressBar, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

// Type for Answers
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

const totalQuestions = 10;

function BasicQuestions() {
  // State for dropdowns
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    personality: false,
    taskOrganizing: false,
    workEnviroment: false,
    favSubject: false,
    motivation: false,
    activity: false,
    challenge: false,
    decision: false,
    workPlace: false,
  });

  // State for answers
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

  // State for completed questions
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Arrays for each question's options
  const options = {
    personality: ["The Adventurer", "The Planner", "The Dreamer", "The Leader", "The Peacemaker", "The Achiever", "The Free Spirit", "The Analyst", "None"],
    taskOrganizing: ["Very Organized", "Somewhat Organized", "Not Very Organized", "Just Go with the Flow", "Organized Chaos", "None"],
    workEnviroment: ["Office-based", "Remote", "Outdoor", "A mix of all", "None"],
    favSubject: ["Math", "Physics", "Chemistry", "Biology", "History", "Art", "Geography", "Literature", "Computer Science", "Economics", "Psychology", "Philosophy", "Music", "Physical Education", "None of the above"],
    motivation: ["Learning new skills", "Helping others", "Working on creative projects", "Solving problems", "Working with a team", "Taking on challenges", "Earning rewards or recognition", "None"],
    activity: ["Working with technology", "Exploring new places", "Teaching", "Building or fixing things", "Writing or storytelling", "Working with numbers or data", "Cooking or preparing meals", "Playing sports or staying active", "None"],
    challenge: ["Solving complex problems", "Meeting new people and networking", "Creating innovative solutions", "Managing multiple tasks at once", "None"],
    decision: ["Based on logic and facts", "Trust my instincts", "Seek advice from others", "Carefully think through all choices", "None"],
    workPlace: ["Welcome change and adapt easily", "Like to keep things the same", "Find it hard but try to adjust", "Do not like change and feel uneasy", "None"],
  };

  // Calculate progress
  const calculateProgress = () => (completedQuestions / totalQuestions) * 100;

  // Update completed question count
  const updateCompletedQuestions = () => {
    let count = 0;
    for (const key in answers) {
      if (key !== "introvertExtrovert" && answers[key as keyof Omit<AnswerType, "introvertExtrovert">].length > 0) {
        count++;
      } else if (key === "introvertExtrovert" && answers.introvertExtrovert) {
        count++;
      }
    }
    setCompletedQuestions(count);
  };

  useEffect(updateCompletedQuestions, [answers]);

  // Handle checkbox change
  const handleCheckboxChange = (question: keyof Omit<AnswerType, "introvertExtrovert">, value: string) => {
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

  // Handle dropdown selection
  const handleSelect = (value: string | null) => {
    if (value) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        introvertExtrovert: value,
      }));
    }
  };

  // Toggle dropdown
  const toggleDropdown = (key: keyof typeof isDropdownOpen) => {
    setIsDropdownOpen((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map((k) => [k, false])),
      [key]: !prevState[key],
    }));
  };

  return (
    <div>
      <h1>Basic Questions</h1>
      <ProgressBar now={calculateProgress()} label={`${calculateProgress().toFixed(0)}%`} />
      <div className="main-container">
        {Object.entries(options).map(([key, values], index) => (
          <div key={key}>
            <label>{`Question ${index + 1}`}</label>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown(key as keyof typeof isDropdownOpen)}
              >
                {`Select ${key.replace(/([A-Z])/g, " $1")}`}
              </button>
              {isDropdownOpen[key as keyof typeof isDropdownOpen] && (
                <div className="checkbox-group">
                  {values.map((value: string) => (
                    <label key={value}>
                      <input
                        type="checkbox"
                        checked={answers[key as keyof AnswerType].includes(value)}
                        onChange={() =>
                          handleCheckboxChange(key as keyof Omit<AnswerType, "introvertExtrovert">, value)
                        }
                      />
                      {value}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => console.log(answers)}>Submit Answers</Button>
    </div>
  );
}

export default BasicQuestions;
