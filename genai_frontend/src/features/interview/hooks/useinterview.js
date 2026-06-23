import { getAllInterviewReports, generateinterviewReport, getInterviewReportById } from "../services/interview.api"; 
import {useContext} from "react"
import { InterviewContext } from "../interview.context";

export const useInterview =()=>{
    const context = use(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading, setloading,report, setReport,setReports}= context

    const generteReport = async ({jobDescription, selfDescription, resumeFile}) =>{
        setloading(true)
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        }catch(error){
            console.error("Error generating interview report:",error)
        }finally{
            setloading(false)
        }
    }

    const getReportById = async (interviewId)=>{
        setloading(true)
        try{
            const reponse = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(error){
            console.log(error)
        }finally{
            setloading(false)
        }
    }
}

const getReports = async ()=>{
    setloading(true)
    try{
        const response = await getAllInterviewReports()
        setReports(response.interviewReports)
    }catch(error){
        console.log(error)
    }finally{
        setLoading(false)
    }

    return {
        loading, report, reports, generateReport, getReportById, getReports
    }
}