const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")
const puppeteer = require("puppeteer")


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
        question : z.string().describe("The behavoiral question can be asked in the interview"),
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
    title:z.string().describe("The title of the job for which the interview report is generated"),
}).strict()


async function generateInterviewReport({resume,selfDescription,jobDescription}){

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
  preparationPlan,
  title

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

const data = JSON.parse(response.text);

console.log("========== FULL AI RESPONSE ==========");
console.dir(data, { depth: null });

console.log(
  "technicalQuestions type:",
  typeof data.technicalQuestions
);

console.log("technicalQuestions value:");
console.dir(data.technicalQuestions, { depth: null });

console.log(
  "behavioralQuestions type:",
  typeof data.behavioralQuestions
);

console.log("behavioralQuestions value:");
console.dir(data.behavioralQuestions, { depth: null });

console.log(
  "skillGaps type:",
  typeof data.skillGaps
);

console.log("skillGaps value:");
console.dir(data.skillGaps, { depth: null });

return data;
    
}




async function generatePdfFromHtml(html) {

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
        format: "A4",margin:{
            top:"20mm",
            bottom:"20mm",
            left:"15mm",
            right:"15mm",
        },
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
}


async function generateResumePdf({resume,selfDescription,jobDescription}) {

    const resumePdfSchema = z.object({
        html:z.string().describe("The HTML content of the resume which can be converted to pdf using any library like puppeteer")
    })

    const prompt = `
 Generate a professional resume for a candidate with the following details.

 Resume:
 ${resume}

 Self Description:
 ${selfDescription}

 Job Description:
 ${jobDescription}

 Requirements:
 - Return ONLY a valid JSON object. 
 - The JSON must contain exactly one field: "html".
 - The "html" field should contain complete HTML that can be converted to PDF using Puppeteer.
 - Tailor the resume according to the job description.
 - Highlight the candidate's strengths and relevant experience.
 - The content should sound natural and human-written.
 - The design should be simple, clean, and professional.
 - Use subtle colors and good typography.
 - Make the resume easy to read and visually appealing.
 -The content sould be ATS friendly, i.e. it should be easily parsable by ATS system without losing important information.
 -The resume should not be too lengthy, it should be 1 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
 `;

      const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:'application/json',
            responseSchema:zodToJsonSchema(resumePdfSchema),

        }
      });

      const jsonContent = JSON.parse(response.text)
      console.log("========== HTML ==========");
      console.log(jsonContent.html);

     console.log("HTML LENGTH:", jsonContent.html?.length);

      const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
      return pdfBuffer
}
module.exports = {generateInterviewReport, generateResumePdf} 

