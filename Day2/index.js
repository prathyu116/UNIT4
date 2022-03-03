const express=require("express")
const app = express()

app.get("",(req,res)=>{
    res.send("Hello")
})
app.get("/books",(req,res)=>{
    res.send({
        "wings of fire":"APJ abdul kalam",
        "Macbeth":"Shakespear",
        "Kayar":"Thakazhi",
        "Vennapoovu":"Kumaranasan"
    })
})

app.listen(5000,()=>{
console.log("listening");
})