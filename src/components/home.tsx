import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to</h1> home page
      <p>Click the button below to take the assessment.</p>
      {/* Button to navigate to the assessment page */}
      <a href="/basic_question">
        <button>Basic Questions</button>
      </a>
      <a href="/detailed_question">
        <button>Detailed Questions</button>
      </a>
    </div>
  );
}

export default Home;
