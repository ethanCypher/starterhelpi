import "./detailed_question.css";
import React from "react";

function DetailedQuestions() {
  return (
    <div>
      <h1>Detailed Question Page</h1>
      <div className="question-container">
        <div className="question">
          <label htmlFor="question1">Question 1</label>
          <textarea id="question1" name="question1"></textarea>
        </div>
        <div className="question">
          <label htmlFor="question2">Question 2</label>
          <textarea id="question2" name="question2"></textarea>
        </div>
        <div className="question">
          <label htmlFor="question3">Question 3</label>
          <textarea id="question3" name="question3"></textarea>
        </div>
        <div className="question">
          <label htmlFor="question4">Question 4</label>
          <textarea id="question4" name="question4"></textarea>
        </div>
      </div>
      <div className="question-container">
        <div className="question">
          <label htmlFor="question5">Question 5</label>
          <textarea id="question5" name="question5"></textarea>
        </div>
        <div className="question">
          <label htmlFor="question6">Question 6</label>
          <textarea id="question6" name="question6"></textarea>
        </div>
        <div className="question">
          <label htmlFor="question7">Question 7</label>
          <textarea id="question7" name="question7"></textarea>
        </div>
      </div>
    </div>
  );
}
export default DetailedQuestions;
