import "./detailed_question.css";
import React from "react";
//import { useNavigate } from "react-router-dom";

function DetailedQuestions() {
  ////const navigate = useNavigate();
  return (
    <div>
      <h1>Detailed Question Page</h1>
      <body>
        <div className="question-container">
          <div className="question">
            <label htmlFor="question1">
              Question 1: What tasks or activities do you find most 
              fulfilling and energizing in your current or previous experiences?
            </label>
            <textarea id="question1" name="question1"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question2">
              Question 2: How do you prefer to interact with others in a work environment:
              through collaboration, competition, or independently? Why?
            </label>
            <textarea id="question2" name="question2"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question3">
              Question 3: What are your strongest skills or talents, whether developed through
              education, hobbies, or work experience?
            </label>
            <textarea id="question3" name="question3"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question4">
              Question 4: Describe a work environment where you thrive: is it structured and
              predictable, fast-paced and dynamic, or creative and flexible?
            </label>
            <textarea id="question4" name="question4"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question5">
              Question 5: What type of problems do you enjoy solving or find most engaging?
            </label>
            <textarea id="question5" name="question5"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question6">
              Question 6: How important are factors like salary, job security, work-life
              balance, and advancement opportunities to you in choosing a career?
            </label>
            <textarea id="question6" name="question6"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question7">
              Question 7: What kind of contribution do you hope to make through your work:
              improving society, innovating new solutions, helping individuals
              directly, etc.?
            </label>
            <textarea id="question7" name="question7"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question8">
              Question 8: Describe a past project or task that you felt extremely proud of and why.
            </label>
            <textarea id="question8" name="question8"></textarea>
          </div>
          <div className="question">
            <label htmlFor="question9">
              Question 9: Lastly, what is it that you wanted to be, growing up as a kid? Explain why.
            </label>
            <textarea id="question9" name="question9"></textarea>
          </div>
        </div>
      </body>
    </div>
  );
}
export default DetailedQuestions;