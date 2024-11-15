import "./basic_question.css";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import { useAccordionButton } from "react-bootstrap";

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
    introvertExtrovert: ""
  });

  // State to track completed questions
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Progress calculation
  const calculateProgress = () => (completedQuestions / totalQuestions) * 100;

  // Function to check if a question is answered
  const updateCompletedQuestions = () => {
    let count = 0;
    for (const key in answers) {
      if (key !== 'introvertExtrovert' && answers[key as keyof Omit<AnswerType, 'introvertExtrovert'>].length > 0) {
        count++;
      } else if (key === 'introvertExtrovert' && answers.introvertExtrovert) {
        count++;
      }
    }
    setCompletedQuestions(count);
  };

  // Update the completed question count whenever answers change
  useEffect(updateCompletedQuestions, [answers]);


//arrays of answers of each question so the function can map through each of them. 
  const personalities = ["The Adventurer", "The Planner", "The Dreamer", "The Leader",
  "The Peacemaker", "The Achiever", "The Free Spirit","The Analyst", "None"];

  const Tasks = ["Very Organized", "Somewhat Organized", "Not Very Organized", "Just Go with the Flow","Organized Chaos", "None"];

  const environments = ["Office-based", "Remote", "Out-door", "A mix of all", "None"];

  const motivations = ["Learning new skills", "Helping others", "Working on creative projects", "Solving problems", "Working with a team", 
  "Taking on challenges", "Earning rewards or recognition", "None"];

  const activities = ["Working with technology", "Exploring new places", "Teaching", "Building or fixing things", "Writing or storytelling", 
  "Working with numbers or data", "Cooking or preparing meals", "Playing sports or staying active", "None"];

  const challenges = ["Solving complex problems", "Meeting new people and networking", "Creating innovative solutions", "Managing multiple tasks at once", "None"];

  const decisions = ["based on logic and facts", "trust my instincts", "seek advice from others", "carefully think through all choices", "None"];

  const workplace = ["Welcome change and adapt easily", "Like to keep things the same", 
  "Find it hard but try to adjust", "Do not like change and feel uneasy", "None"];

  const subjects = ["Math", "Physics", "Chemistry", "Biology", "History","Art", "Geography", "Literature", "Computer Science",
  "Economics", "Psychology", "Philosophy", "Music", "Physical Education", "None of the above"];

  //Newly added 
  // Function to handle checkbox selection
  const handleCheckboxChange = (question: keyof Omit<AnswerType, 'introvertExtrovert'>, value: string) => {
    setAnswers(prevAnswers => {
      const currentValues = [...prevAnswers[question]];
      const valueIndex = currentValues.indexOf(value);
      
      if (valueIndex === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(valueIndex, 1);
      }
      return {
        ...prevAnswers,
        [question]: currentValues
      };
    });
  };
  
  // Function to handle dropdown selection
  const handleSelect = (value: string | null) => {
    if (value) {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        introvertExtrovert: value
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
  const toggleDropdown = (setter: (value: boolean) => void, isOpen: boolean) => {
    resetAllDropdowns();
    setter(!isOpen);
  };

  // Usage for each dropdown toggle
  const togglePersonalityDropdown = () => toggleDropdown(setIsPersonalityOpen, isPersonalityOpen);
  const toggleTaskOrganizingDropdown = () => toggleDropdown(setIsTaskOrganizingOpen, isTaskOrganizingOpen);
  const toggleFavSubject = () => toggleDropdown(setIsYourFavSubject, isYourFavSubjectOpen);
  const toggleWorkEnviroment = () => toggleDropdown(setIsWorkEnviroment, isWorkEnviroment);
  const toggleMotivation = () => toggleDropdown(setIsMotivation, isMotivation);
  const toggleActivity = () => toggleDropdown(setIsActivity, isActivity);
  const toggleChallenge = () => toggleDropdown(setIsChallenge, isChallenge);
  const toggleDecision = () => toggleDropdown(setIsDecision, isDecision);
  const toggleWorkPlace = () => toggleDropdown(setIsWorkPlace, isWorkPlace);

  return (
    <div>
      <h1>Basic Question</h1>
      <div className="main-container">
        <div className="question">
          {/* Personality Dropdown */}
          <ProgressBar now={calculateProgress()} label={`${calculateProgress().toFixed(0)}%`} />
          <label>Question 1</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={togglePersonalityDropdown}>
              Which of these best represents your personality?
            </button>
            {isPersonalityOpen && (
            <div className="checkbox-group">
              {personalities.map((personality) => (
                <label key={personality}>
                  <input
                    type="checkbox"
                    checked={answers.personality.includes(personality)}
                    onChange={() => handleCheckboxChange("personality", personality)}
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
        <button className="dropdown-toggle" onClick={toggleTaskOrganizingDropdown}>
          How do you typically manage your tasks and projects?
        </button>
        {isTaskOrganizingOpen && (
          <div className="checkbox-group">
            {Tasks.map((task) => (
              <label key={task}>
                <input
                  type="checkbox"
                  checked={answers.taskOrganizing.includes(task)}
                  onChange={() => handleCheckboxChange("taskOrganizing", task)}
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
                  onChange={() => handleCheckboxChange("workEnviroment", environment)}
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
              onChange={()=> handleCheckboxChange("favSubject", subject)}
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
              onChange={()=> handleCheckboxChange("motivation", motivation)}
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
              onChange={()=> handleCheckboxChange("activity", activity)}
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
              onChange={()=> handleCheckboxChange("challenge", challenge)}
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
              onChange={()=> handleCheckboxChange("decision",decision)}
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
              onChange={()=> handleCheckboxChange("workPlace", response)}
            />
            {response}
          </label>
        ))}
      </div>
    )}
  </div>
  <label>Which one of the following describes you the most?</label>
<div style={{padding: '15px', width: "105%"}}>
  <Dropdown onSelect={handleSelect}>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {answers.introvertExtrovert || 'Select an option'}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item eventKey="Introvert">Introvert</Dropdown.Item>
      <Dropdown.Item eventKey="Extrovert">Extrovert</Dropdown.Item>
      <Dropdown.Item eventKey="Both">Both</Dropdown.Item>
      <Dropdown.Item eventKey="None">None</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  
  {answers.introvertExtrovert && (
    <div style={{ marginTop: '5%', width: '120%' }}>
      <strong>Selected Option:</strong> {answers.introvertExtrovert}
    </div>
  )}
</div>
          </div>
        </div>
      </div>
  );
}

export default BasicQuestions;
