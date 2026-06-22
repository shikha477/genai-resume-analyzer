import {createContext, useState} from "react";

export const InterviewContext = createContext()

export const InterviewProvider = ({childer}) =>{
    const[loading, setLoading] = useState(false)
    const [report, setreport] = useState(null)
    const {reports,setReports} = useState([])

    return (
        <InterviewContext.Provider value={{loading,setloading, report, setReport,reports, setReports}}>
            {childern}
        </InterviewContext.Provider>
    )
}