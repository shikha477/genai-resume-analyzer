import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useinterview.js";

import {useNavigate, useParams} from "react-router"
// import { getInterviewReportById } from "../services/interview.api.jsx";
const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);

  const { report,loading, getReportById } = useInterview();
  const {interviewId} = useParams()

  useEffect(()=>{
    if(interviewId){
      getReportById(interviewId)
    }
  },[interviewId])
   if(loading||!report){
    return(
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    )
   }

  const getData = () => {
  if (!report) return [];

  switch (activeTab) {
    case "technical":
      return report.technicalQuestions || [];

    case "behavioral":
      return report.behavioralQuestions || [];

    case "roadmap":
      return report.preparationPlan || [];

    default:
      return [];
  }
};

  const currentData = getData();

  return (
    <main className="interview">
      <div className="dashboard">
        {/* SIDEBAR */}

        <aside className="sidebar">
          <h5>SECTIONS</h5>

          <button
            className={activeTab === "technical" ? "active" : ""}
            onClick={() => setActiveTab("technical")}
          >
            Technical Questions
          </button>

          <button
            className={activeTab === "behavioral" ? "active" : ""}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral Questions
          </button>

          <button
            className={activeTab === "roadmap" ? "active" : ""}
            onClick={() => setActiveTab("roadmap")}
          >
            Road Map
          </button>

          <button className="download-btn">
            Download Resume
          </button>
        </aside>

        {/* MAIN CONTENT */}

        <section className="questions-panel">
          <div className="panel-header">
            <div className="left-header">
              <h2>
                {activeTab === "technical" &&
                  "Technical Questions"}

                {activeTab === "behavioral" &&
                  "Behavioral Questions"}

                {activeTab === "roadmap" &&
                  "Preparation Road Map"}
              </h2>

              <span>
                {currentData.length} Questions
              </span>
            </div>

            <p>
              0/{currentData.length} reviewed
            </p>
          </div>

          {/* <div className="questions-list">

            {currentData.map((item, index) => (
              <div
                className="question-card"
                key={index}
              >
                <div
                  className="question-head"
                  onClick={() =>
                    setOpenQuestion(
                      openQuestion === index
                        ? null
                        : index
                    )
                  }
                >
                  <div className="question-info">

                    <input type="radio" />

                    <span className="q-badge">
                      Q{index + 1}
                    </span>

                    <p>
                      {item.question ||
                        item.tasks?.[0]}
                    </p>
                  </div>

                  <span className="expand-icon">
                    {openQuestion === index
                      ? "−"
                      : "+"}
                  </span>
                </div>

                {openQuestion === index &&
                  activeTab !== "roadmap" && (
                    <div className="question-body">
                      <h4>Intention</h4>

                      <p>
                        {item.intention}
                      </p>

                      <h4>Preparation Hint</h4>

                      <p>
                        {item.answer}
                      </p>
                    </div>
                  )}
              </div>
            ))}

          </div> */}
          <div className="questions-list">

  {currentData.map((item, index) => (

    <div className="question-card" key={index}>

      <div
        className="question-head"
        onClick={() =>
          setOpenQuestion(
            openQuestion === index ? null : index
          )
        }
      >

        <div className="question-info">

          <input type="radio" />

          <span className="q-badge">
            {
              activeTab === "roadmap"
                ? `D${item.day}`
                : `Q${index + 1}`
            }
          </span>

          <div>

            {
              activeTab === "roadmap"
                ? (
                  <>
                    <h4 className="roadmap-focus">
                      Day {item.day}
                    </h4>

                    <p className="roadmap-title">
                      {item.focus}
                    </p>
                  </>
                )
                : (
                  <p>
                    {item.question}
                  </p>
                )
            }

          </div>

        </div>

        <span className="expand-icon">
      {
      openQuestion === index
        ? "⌃"
        : "⌄"
      }
</span>

      </div>


      {
        openQuestion === index && (

          <div className="question-body">

            {
              activeTab === "roadmap"
                ? (

                  <>
                    <h4>
                      Tasks
                    </h4>

                    <ul className="roadmap-tasks">

                      {
                        item.tasks.map((task, i) => (

                          <li key={i}>
                            {task}
                          </li>

                        ))
                      }

                    </ul>

                  </>
                )
                : (

                  <>
                    <h4>
                      Intention
                    </h4>

                    <p>
                      {item.intention}
                    </p>

                    <h4>
                      Preparation Hint
                    </h4>

                    <p>
                      {item.answer}
                    </p>

                  </>

                )
            }

          </div>

        )
      }

     </div>

    ))}

     </div>
        </section>

        {/* RIGHT PANEL */}

        <aside className="stats-panel">
          <h5>MATCH SCORE</h5>

          <div className="score-circle">
            <div>
              <h2>
                {report?.matchScore || 0}
              </h2>

              <span>%</span>
            </div>
          </div>

          <p className="match-status">
            Moderate match — Work on gaps
          </p>

          <h5 className="skill-title">
            SKILL GAPS
          </h5>

          <div className="skills">
            {report?.skillGaps?.map(
              (skill, index) => (
                <span
                  key={index}
                  className="skill-tag"
                >
                  {skill.skill}
                </span>
              )
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;