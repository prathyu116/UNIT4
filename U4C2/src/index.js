const express = require("express")

const mongoose = require("mongoose")
const app = express()
app.use(express.json())
//=================================user schema========================================
const UserSchema =mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String},
        lastName:{type:String,required:true},
        age:{type:Number,required:true},
        address:{type:String,required:true},
        email:{type:String,required:true},
        gender:{type:String,default:'Female'},
        type:{type:String,default:"customor"},
        savingAccount:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"savingaccount",
            required:true
        },
        fixedAccount:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"fixedaccount",
            required:true
        }

    },
    {
        timestamps:true
    }
)
const UserModel = mongoose.model("user",UserSchema)
//=================================user schema end========================================



//=========================BranchSchema======================
const BranchSchema =mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR:{type:Number,required:true},
        MasterAccountId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"masteraccount",
            required:true
        }

     

    },
    {
        timestamps:true
    }
)
const BranchModel = mongoose.model("branch",BranchSchema)
//=========================BranchSchema end================================



//=========================MasterAccountSchema ======================
const MasterAccountSchema =mongoose.Schema(
    {
        balance:{type:String,required:true},
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        savingAccount:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"savingaccount",
            required:true
        }
    },
    {
        timestamps:true
    }
)
const MasterAccountSchemaModel = mongoose.model("masteraccount",MasterAccountSchema)
//=========================MasterAccountSchema end================================


//=========================SavingsAccountSchema ======================
const SavingsAccountSchema =mongoose.Schema(
    {
        account_number :{type:Number,required:true},
        balance:{type:String,required:true},
        interestRate:{type:String,required:true},
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        masteraccountId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"masteraccount",
            required:true
        }
 

    },
    {
        timestamps:true
    }
)
const SavingsAccountSchemaModel = mongoose.model("savingaccount",SavingsAccountSchema)
//=========================SavingsAccountSchema end================================


//=========================FixedAccountSchema ======================
const FixedAccountSchema =mongoose.Schema(
    {
        account_number :{type:Number,required:true},
        balance:{type:String,required:true},
        interestRate:{type:String,required:true},
        startDate:{type:Date,required:true},
        maturityDate:{type:Date,required:true},
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    },
    {
        timestamps:true
    }
)
const FixedAccountSchemaModel = mongoose.model("fixedaccount",FixedAccountSchema)
//=========================FixedAccountSchema end================================


app.get("/masteraccount",async(req,res)=>{
    try{
        const masterAccoutDetails=await MasterAccountSchemaModel.find()
        .populate({
            path:'UserId'
        })
        .lean()
        .exec()
        return res.status(200).send(masterAccoutDetails)

    }catch(err){
        return res.status(500).send({err:err})
    }
})

app.post("/createSavingAcc",async(req,res)=>{
   try{
       const savingAccount= await SavingsAccountSchemaModel.create(req.body)
       return res.status(201).send(savingAccount)


   }catch(err){
    return res.status(500).send({err:err})

   }
})

app.post("/createFixedaccount",async(req,res)=>{
   try{
       const FiexedAccount= await FixedAccountSchemaModel.create(req.body)
       return res.status(201).send(FiexedAccount)


   }catch(err){
    return res.status(500).send({err:err})

   }
})

app.get("/masteracount/:id",async(req,res)=>{
   const userDetails= await MasterAccountSchemaModel.findById(req.params.id)
})

app.listen(5000,()=>{
    console.log("listening port 5000")
})