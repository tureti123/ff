const express=require('express')
const app=express()
const port =process.env.PORT || 9000
app.use("/",(req,res)=>{
res.json({message:"hello"})
})
app.listen(port,()=>console.log(port))