import "./basic_question.css";
import React, { useState } from "react";
//import { useAccordionButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
//import { useNavigate } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form } from "react-bootstrap";

function BasicQuestions() {
  // Separate state for each dropdown
  const [isPersonalityOpen, setIsPersonalityOpen] = useState(false);
  const [isTaskOrganizingOpen, setIsTaskOrganizingOpen] = useState(false);
  const [isYourFavSubjectOpen, setIsYourFavSubject] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isWorkEnviroment, setIsWorkEnviroment] = useState(false);
  const [isMotivation, setIsMotivation] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  const [isChallenge, setIsChallenge] = useState(false);
  const [isDecision, setIsDecision] = useState(false);
  const [isWorkPlace, steIsWorkPlace] = useState(false);

  //console.log(completion.choices[0].message);
  //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)

  // Toggle functions for each dropdown
  const togglePersonalityDropdown = () => {
    setIsPersonalityOpen(!isPersonalityOpen);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const toggleTaskOrganizingDropdown = () => {
    setIsTaskOrganizingOpen(!isTaskOrganizingOpen);
    setIsPersonalityOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const toggleFavSubject = () => {
    setIsYourFavSubject(!isYourFavSubjectOpen);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedOption(eventKey);
    }
  };

  const toggleWorkEnviroment = () => {
    setIsWorkEnviroment(!isWorkEnviroment);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const toggleMotivation = () => {
    setIsMotivation(!isMotivation);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const toggleActivity = () => {
    setIsActivity(!isActivity);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  const toggleChallenge = () => {
    setIsChallenge(!isChallenge);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsDecision(false);
  };

  const toggleDecision = () => {
    setIsDecision(!isDecision);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    steIsWorkPlace(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
  };

  const toggleWorkPlace = () => {
    steIsWorkPlace(!isWorkPlace);
    setIsPersonalityOpen(false);
    setIsTaskOrganizingOpen(false);
    setIsYourFavSubject(false);
    setIsWorkEnviroment(false);
    setIsMotivation(false);
    setIsActivity(false);
    setIsChallenge(false);
    setIsDecision(false);
  };

  // implementing GPT

  const [answers, setAnswers] = useState<string[]>(Array(9).fill(""));
  const [response, setResponse] = useState<string>("");

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
                  "You are a career advisor specializing in providing detailed assessments based on user responses. Give in-depth feedback and career guidance based on the answers provided.",
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
    <div>
      <h1>Basic Question</h1>
      <div className="main-container">
        <div className="question">
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
                <label>
                  <input
                    type="checkbox"
                    name="personality"
                    value="Adventurer"
                  />
                  The Adventurer
                </label>
                <label>
                  <input type="checkbox" name="personality" value="planner" />
                  The Planner
                </label>
                <label>
                  <input type="checkbox" name="personality" value="dreamer" />
                  The Dreamer
                </label>
                <label>
                  <input type="checkbox" name="personality" value="leader" />
                  The Leader
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="personality"
                    value="peacemaker"
                  />
                  The Peacemaker
                </label>
                <label>
                  <input type="checkbox" name="personality" value="achiever" />
                  The Achiever
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="personality"
                    value="freespirit"
                  />
                  The Free Spirit
                </label>
                <label>
                  <input type="checkbox" name="personality" value="analyst" />
                  The Analyst
                </label>
                <label>
                  <input type="checkbox" name="personality" value="none" />
                  None
                </label>
              </div>
            )}
          </div>
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
                <label>
                  <input
                    type="checkbox"
                    name="organizing"
                    value="Very-organized"
                  />
                  Very Organized
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organizing"
                    value="Somewhat-organized"
                  />
                  Somewhat Organized
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organizing"
                    value="Not-very-organized"
                  />
                  Not Very Organized
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organizing"
                    value="Just-go-with-the-Flow"
                  />
                  Just Go with the Flow
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organizing"
                    value="Organized-chaos"
                  />
                  Organized Chaos
                </label>
                <label>
                  <input type="checkbox" name="organizing" value="none" />
                  None
                </label>
              </div>
            )}
          </div>
          <label>Question 3</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleWorkEnviroment}>
              {" "}
              What type of work environment do you prefer?
            </button>
            {isWorkEnviroment && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="environment"
                    value="Office-based"
                  />{" "}
                  Office-based{" "}
                </label>
                <label>
                  <input type="checkbox" name="environment" value="remote" />{" "}
                  Remote{" "}
                </label>
                <label>
                  <input type="checkbox" name="environment" value="out-door" />{" "}
                  Out-door{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="environment"
                    value="A-mix-of-all"
                  />{" "}
                  A mix of all{" "}
                </label>
                <label>
                  <input type="checkbox" name="environment" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 4</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleFavSubject}>
              {" "}
              Which subject area do you like the most?{" "}
            </button>
            {isYourFavSubjectOpen && (
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="subject" value="math" /> Math{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Physics" />{" "}
                  Physics{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Chemistry" />{" "}
                  Chemistry{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="biology" />{" "}
                  Biology{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="history" />{" "}
                  History{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="art" /> Art{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="geography" />{" "}
                  Geography{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Literature" />{" "}
                  Literature{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Literature" />{" "}
                  Literature{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Literature" />{" "}
                  Literature{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="subject"
                    value="Computer-Science"
                  />{" "}
                  Computer Science{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Economics" />{" "}
                  Economics{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Psychology" />{" "}
                  Psychology
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Philosophy" />
                  Philosophy{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="Music" />
                  Music{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="subject"
                    value="Physical-Education"
                  />
                  Physical Education{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="none" /> None of
                  the above{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 5</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleMotivation}>
              {" "}
              What motivates you at work?
            </button>
            {isMotivation && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="motivation"
                    value="Learning-new-skills"
                  />{" "}
                  Learning new skills{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="motivation"
                    value="Helping-others"
                  />{" "}
                  Helping others{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="motivation"
                    value="Working-on-creative-projects"
                  />{" "}
                  Working on creative projects{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="motivation"
                    value="Solving-problems"
                  />{" "}
                  Solving problems
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="smotivation"
                    value="Working-with-a-team"
                  />{" "}
                  Working with a team{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="subject"
                    value="Taking-on-challenges"
                  />{" "}
                  Taking on challenges{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="subject"
                    value="Earning-rewards-or-recognition"
                  />{" "}
                  Earning rewards or recognition{" "}
                </label>
                <label>
                  <input type="checkbox" name="subject" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 6</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleActivity}>
              {" "}
              Which of the following activities do you enjoy the most?
            </button>
            {isActivity && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Working-with-technology"
                  />{" "}
                  Working with technology{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Exploring-new-places"
                  />{" "}
                  Exploring new places{" "}
                </label>
                <label>
                  <input type="checkbox" name="activity" value="Teaching" />{" "}
                  Teaching{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Building-or-fixing-things"
                  />{" "}
                  Building or fixing things{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Writing-or-storytelling"
                  />{" "}
                  Writing or storytelling{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Working-with-numbers-or-data"
                  />{" "}
                  Working with numbers or data{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Cooking-or-preparing-meals"
                  />{" "}
                  Cooking or preparing meals{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="activity"
                    value="Playing-sports-or-staying-active"
                  />{" "}
                  Playing sports or staying active{" "}
                </label>
                <label>
                  <input type="checkbox" name="activity" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 7</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleChallenge}>
              {" "}
              What type of challenges do you enjoy at work?
            </button>
            {isChallenge && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="challenge"
                    value="Solving-complex-problems"
                  />{" "}
                  Solving complex problems{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="challenge"
                    value="Meeting-new-people-and-networking"
                  />{" "}
                  Meeting new people and networking{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="challenge"
                    value="Creating-innovative-solutions"
                  />{" "}
                  Creating innovative solutions{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="challenge"
                    value="Managing-multiple-tasks-at-once"
                  />{" "}
                  Managing multiple tasks at once{" "}
                </label>
                <label>
                  <input type="checkbox" name="challenge" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 8</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDecision}>
              {" "}
              How do you handle decision-making?
            </button>
            {isDecision && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="decision"
                    value="based-on-logic-and-facts"
                  />{" "}
                  based on logic and facts{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="decision"
                    value="trust-my-instincts"
                  />{" "}
                  trust my instincts{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="decision"
                    value="seek-advice-from-others"
                  />{" "}
                  seek advice from others{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="decision"
                    value="carefully-think-through-all-choices"
                  />{" "}
                  carefully think through all choices{" "}
                </label>
                <label>
                  <input type="checkbox" name="decision" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Question 9</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleWorkPlace}>
              {" "}
              How do you respond to changes in the workplace?
            </button>
            {isWorkPlace && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="workplace"
                    value="welcome-change-and-adapt-easily."
                  />{" "}
                  Welcome change and adapt easily{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="workplace"
                    value="like-to-keep-things-the-same"
                  />{" "}
                  Like to keep things the same{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="workplace"
                    value="find-it-hard-but-try-to-adjust."
                  />{" "}
                  Find it hard but try to adjust{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="workplace"
                    value="do-not-like-change-and-feel-uneasy."
                  />{" "}
                  Do not like change and feel uneasy{" "}
                </label>
                <label>
                  <input type="checkbox" name="workplace" value="none" /> None{" "}
                </label>
              </div>
            )}
          </div>
          <label>Which one of the following describes you the most?</label>
          <div style={{ padding: "15px", width: "105%" }}>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select an option
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Introvert">Introvert</Dropdown.Item>
                <Dropdown.Item eventKey="Extrovert">Extrovert</Dropdown.Item>
                <Dropdown.Item eventKey="Both">Both</Dropdown.Item>
                <Dropdown.Item eventKey="None">None</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {selectedOption && (
              <div style={{ marginTop: "5%", width: "120%" }}>
                <strong>Selected Option:</strong> {selectedOption}
              </div>
            )}
          </div>
          <button onClick={submitAnswers} style={{ marginTop: "20px" }}>
            Submit for Assessment
          </button>{" "}
          {/* Submit button */}
          {response && (
            <div className="response" style={{ marginTop: "20px" }}>
              {" "}
              {/* Response section */}
              <h2>Career Assessment Result</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicQuestions;
