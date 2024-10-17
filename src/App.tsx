import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import Home from "./components/home";
import BasicQuestions from "./components/basic_question";
import { Routes, Route, Link } from "react-router-dom";
import DetailedQuestions from "./components/detailed_question";
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Home navigation Button */}
        <Link to="/" className="Home-button">
          <Button variant="outline-light" size="lg" className="mt-3">
            Home
          </Button>
        </Link>
      </header>

      {/* Routes for the different pages */}
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic_question" element={<BasicQuestions />} />
          <Route path="/detailed_question" element={<DetailedQuestions />} />
        </Routes>
      </div>

      <footer className="App-footer">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            onChange={changeKey}
          ></Form.Control>
          <br></br>
          <Button
            variant="outline-light"
            size="lg"
            className="mt-3"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </footer>
    </div>
  );
}

export default App;
