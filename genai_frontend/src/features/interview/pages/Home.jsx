
import React,{useState, useRef} from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useinterview.js";
import { useNavigate } from "react-router";

const Home = () => {
const {loading,generateReport}= useInterview()
const [jobDescription, setJobDescription]=useState("")
const [selfDescription, setSelfDescription]= useState("")
const resumeInputRef = useRef()

const navigate= useNavigate()

const handleGenerateReport = async()=>{
  const resumeFile = resumeInputRef.current.files[0]
  const data = await generateReport ({ jobDescription, selfDescription, resumeFile})
  navigate(`/interview/${data._id}`)
}
if(loading){
  return(
    <main className="loading-screen">
      <h1>Loading your interview plan...</h1>

    </main>
  )
}

  return (
    <main className="home">
      <div className="container">

        <div className="heading">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>

          <p>
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        <div className="interview-input-group">

          {/* LEFT */}

          <div className="left">

            <div className="section-header">
              <label className="title">
                📋 Target Job Description
              </label>

              <span className="required">
                REQUIRED
              </span>
            </div>

            <textarea
              onChange={(e)=>{setJobDescription(e.target.value)}}
              name="jobDescription"
              id="jobDescription"
              placeholder={`Paste the full job description here...

e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
            />

            <span className="char-count">
              0 / 5000 chars
            </span>

          </div>

          {/* RIGHT */}

          <div className="right">

            <div className="section-header">
              <label className="title">
                👤 Your Profile
              </label>
            </div>

            <div className="input-group">

              <div className="resume-header">
                <p>Upload Resume</p>

                <span className="best-result">
                  BEST RESULTS
                </span>
              </div>

              <label
                htmlFor="resume"
                className="file-label"
              >
                <div className="upload-icon">
                  ☁
                </div>

                <h4>
                  Click to upload or drag & drop
                </h4>

                <span>
                  PDF or DOCX (Max 5MB)
                </span>
              </label>

              <input ref={resumeInputRef}
                hidden
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-group">

              <label htmlFor="selfDescription">
                Quick Self-Description
              </label>

              <textarea
                onChange={(e)=>{setSelfDescription(e.target.value)}}
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />

            </div>

            <div className="info-box">
              ℹ️ Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized plan.
            </div>

          </div>

        </div>

        <div className="footer">

          <p>
            AI-Powered Strategy Generation • Approx 30s
          </p>

          <button 
           onClick={handleGenerateReport}
           className="generate-btn">
            
            ✨ Generate My Interview Strategy
          </button>

        </div>

      </div>
    </main>
  );
};

export default Home;