const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({

    matchScore:z.number().describe ("A score between 0 and 100 indicating how well the candidate's profile matches the job description "),

    technicalQuestions: z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical question that can be asked in the innterview along with their intention and how to answer them"),


    behavioralQuestions:z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")

    })).describe("Behavioural question that can be asked in the innterview along with their intention and how to answer them"),

    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).describe("The severity of this skill gap,i.e. how important is the skill for the job")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan:z.array(z.object({
        day:z.number().describe("The day number in the preparation plan,starting from 1"),
        focus:z.string().describe("Thebe main focus of this day in the preparation plan, e.g. data structure, system design , mock interviews"),
        tasks:z.array(z.string()).describe("List of the task to be done on this day to follow the preparation plan, e.g.read a specific book ")
    })).describe("A day-wise preparatio plan for the candidate to follow in order to prepare for the interview effectively  "),
}).strict()

async function generateInterviewReport({resume,selfDescription,jobDescription}){


    // const prompt = `Generate an interview report for a condidate with the following details:
    // Resume: ${resume}
    // self Description: ${SelfDescription}
    // job Description :${jobDescription}`

    const prompt = `
 Generate an interview report.

 IMPORTANT:
 - Return ONLY valid JSON.
 - Follow the provided schema exactly.
 - Do not add fields like candidateName, candidateEmail, strengths, weaknesses, notes.
 - Include only:
  matchScore,
  technicalQuestions,
  behavioralQuestions,
  skillGaps,
  preparationPlan

 Resume:
 ${resume}

 Self Description:
 ${selfDescription}

 Job Description:
 ${jobDescription}
 `;

   const response = await ai.models.generateContent({
     model: "gemini-2.5-flash",
     contents: prompt,
     config: {
    responseMimeType: "application/json",
    responseSchema: zodToJsonSchema(interviewReportSchema)
  }
 })
 
  return JSON.parse(response.text)
    

}
module.exports = generateInterviewReport 

