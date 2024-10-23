import "./basic_question.css";
import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'

function BasicQuestions() {
  // Separate state for each dropdown
  const [isPersonalityOpen, setIsPersonalityOpen] = useState(false);
  const [isTaskOrganizingOpen, setIsTaskOrganizingOpen] = useState(false);
  const [isYourFavSubjectOpen, setIsYourFavSubject] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Toggle functions for each dropdown
  const togglePersonalityDropdown = () => {
    setIsPersonalityOpen(!isPersonalityOpen);
  };

  const toggleTaskOrganizingDropdown = () => {
    setIsTaskOrganizingOpen(!isTaskOrganizingOpen);
  };

  const toggleFavSubject = () => {
    setIsYourFavSubject(!isYourFavSubjectOpen);
  }

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedOption(eventKey); 
    }
  };


  return (
    <div>
      <h1>Basic Question Page</h1>
      <div className="main-container">
        <div className="question">
          <label>Question 1</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={togglePersonalityDropdown}>
            Which of the following describes you the most?
            </button>
            {isPersonalityOpen && (
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="personality" value="explorer" />
                  The Explorer
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
                  <input type="checkbox" name="personality" value="peacemaker" />
                  The Peacemaker
                </label>
                <label>
                  <input type="checkbox" name="personality" value="achiever" />
                  The Achiever
                </label>
                <label>
                  <input type="checkbox" name="personality" value="freespirit" />
                  The Free Spirit
                </label>
                <label>
                  <input type="checkbox" name="personality" value="analyst" />
                  The Analyst
                </label>
              </div>
            )}
          </div>
          <label>Question 2</label>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleTaskOrganizingDropdown}>
            How do you prefer to organize your tasks and projects?
            </button>
            {isTaskOrganizingOpen && (
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="organizing" value="Very-organized" />
                  Very Organized
                </label>
                <label>
                  <input type="checkbox" name="organizing" value="Somewhat-organized" />
                  Somewhat Organized
                </label>
                <label>
                  <input type="checkbox" name="organizing" value="Not-very-organized" />
                  Not Very Organized
                </label>
                <label>
                  <input type="checkbox" name="organizing" value="Just-go-with-the-Flow" />
                  Just Go with the Flow
                </label>
                <label>
                  <input type="checkbox" name="organizing" value="Organized-chaos" />
                  Organized Chaos
                </label>
              </div>
            )}
          </div>
          <label>Question 3</label>
          <div className= "dropdown">
            <button className= "dropdown-toggle" onClick= {toggleFavSubject}> What is your favorite subject?</button>
            {isYourFavSubjectOpen && (
              <div className= "checkbox-group">
                <label>
                  <input type ="checkbox" name="subject" value="math" /> Math </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                  <label>
                  <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                  <label>
                  <input type ="checkbox" name="subject" value="history" /> History </label>
                  <label>
                  <input type ="checkbox" name="subject" value="art" /> Art </label>
                  <label>
                  <input type ="checkbox" name="subject" value="geography" /> Geography </label>
              </div>
            )}
            </div>
          <label>What is your favorite subject?</label>
          <div className= "dropdown">
            <button className= "dropdown-toggle" onClick= {toggleFavSubject}> Select Option</button>
            {isYourFavSubjectOpen && (
              <div className= "checkbox-group">
                <label>
                  <input type ="checkbox" name="subject" value="math" /> Math </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                  <label>
                  <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                  <label>
                  <input type ="checkbox" name="subject" value="history" /> History </label>
                  <label>
                  <input type ="checkbox" name="subject" value="art" /> Art </label>
                  <label>
                  <input type ="checkbox" name="subject" value="geography" /> Geography </label>
              </div>

              

            )}
            </div>
          <label>What is your favorite subject?</label>
          <div className= "dropdown">
            <button className= "dropdown-toggle" onClick= {toggleFavSubject}> Select Option</button>
            {isYourFavSubjectOpen && (
              <div className= "checkbox-group">
                <label>
                  <input type ="checkbox" name="subject" value="math" /> Math </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                  <label>
                  <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                  <label>
                  <input type ="checkbox" name="subject" value="history" /> History </label>
                  <label>
                  <input type ="checkbox" name="subject" value="art" /> Art </label>
                  <label>
                  <input type ="checkbox" name="subject" value="geography" /> Geography </label>
              </div>

              

            )}
            </div>
          <label>What is your favorite subject?</label>
          <div className= "dropdown">
            <button className= "dropdown-toggle" onClick= {toggleFavSubject}> Select Option</button>
            {isYourFavSubjectOpen && (
              <div className= "checkbox-group">
                <label>
                  <input type ="checkbox" name="subject" value="math" /> Math </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                  <label>
                  <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                  <label>
                  <input type ="checkbox" name="subject" value="history" /> History </label>
                  <label>
                  <input type ="checkbox" name="subject" value="art" /> Art </label>
                  <label>
                  <input type ="checkbox" name="subject" value="geography" /> Geography </label>
              </div>

              

            )}
            </div>
          <label>What is your favorite subject?</label>
          <div className= "dropdown">
            <button className= "dropdown-toggle" onClick= {toggleFavSubject}> Select Option</button>
            {isYourFavSubjectOpen && (
              <div className= "checkbox-group">
                <label>
                  <input type ="checkbox" name="subject" value="math" /> Math </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                  <label>
                  <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                  <label>
                  <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                  <label>
                  <input type ="checkbox" name="subject" value="history" /> History </label>
                  <label>
                  <input type ="checkbox" name="subject" value="art" /> Art </label>
                  <label>
                  <input type ="checkbox" name="subject" value="geography" /> Geography </label>
              </div>

              

            )}
            </div>
            <label>What is your favorite subject?</label>
            <div className= "dropdown">
              <button className= "dropdown-toggle" onClick= {toggleFavSubject}> Select Option</button>
              {isYourFavSubjectOpen && (
                <div className= "checkbox-group">
                  <label>
                    <input type ="checkbox" name="subject" value="math" /> Math </label>
                    <label>
                    <input type ="checkbox" name="subject" value="Physics" /> Physics </label>
                    <label>
                    <input type ="checkbox" name="subject" value="Chemistry" /> Chemistry </label>
                    <label>
                    <input type ="checkbox" name="subject" value="biology" /> Biology </label>
                    <label>
                    <input type ="checkbox" name="subject" value="history" /> History </label>
                    <label>
                    <input type ="checkbox" name="subject" value="art" /> Art </label>
                    <label>
                    <input type ="checkbox" name="subject" value="geography" /> Geography </label>
                </div>
  
                
  
              )}
          </div>
          <label>Which one of the following describes you the most?</label>
          <div style ={{padding: '20px', width: "105%"}}>
            <Dropdown onSelect ={handleSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select an option
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item eventKey="Introvert">Introvert</Dropdown.Item>
              <Dropdown.Item eventKey= "Extrovert">Extrovert</Dropdown.Item>
              <Dropdown.Item eventKey= "Both">Both</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            {selectedOption && (
        <div style={{ marginTop: '80%', width: '120%' }}>
          <strong>Selected Option:</strong> {selectedOption}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicQuestions;
