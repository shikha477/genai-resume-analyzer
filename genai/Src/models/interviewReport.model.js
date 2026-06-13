const mongoose = require('mongoose');

/**
 * -job description schema:String
 * -resume text :String
 * -self description :String
 * 
 * -matchScore:Number
 * 
 * - Technical question :[{
 *       question :"",
 *       intention:"",
 *       answer:"",
 * }]
 * -behavioral question :[{
 *      question:"",
 *      intention:"",
 *      answer:"",
 * }]
 * -skill gaps:[{
 *      skill:"",
 *      severity:{
 *        type:String,
 *        enum:["low","medium","high"]
 * }
 * }]
 * -preparation plan :[{
 *     day:Number,
 *     focus: String,
 *     task:[String]
 * }]
 */

const technicalQuestion = new mongoose.Schema({
    question :{
        type:String,
        required:[true, "Technical question is required "]
    },
    intention:{
        type:String,
        required:[true," intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})
const behavioralQuestionSchema = new mongoose.Schema({
    question :{
        type:String,
        required:[true, "Technical question is required "]
    },
    intention:{
        type:String,
        required:[true," intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true, "Severity is required"]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        reyuired:[true,"Day is required"]
    },
    focus:{
        
        type:String,
        required:[true,"Focus is required"]
    
    },
    tasks:[{
        type:String,
        required: [true,"task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jonDescription :{
        type:String,
        required:[true,"job description is required"]
    },
    resume:{
        type:String,

    },
    selfDescription :{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[ behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true

})

const interviewReportModel = mongoose.model("interviewReport",interviewReportSchema);

module.export = interviewReportModel