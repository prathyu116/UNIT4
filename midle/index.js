const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connect = async () => {
  return mongoose.connect(
    "mongodb+srv://prathyu:mCShWppioXwqhLGm@cluster0.hbeuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};

//===========================Create Book Schema====================================
const BookSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    language: { type: String, required: true },
    author: {type:String},

  }
);
const BookModel = mongoose.model("book", BookSchema);



app.get("/books", fetchingBook,async (req, res) => {
  try {
    const getAllBooks = await BookModel.find().lean().exec();
    return res.status(200).send({ getAllBooks: getAllBooks });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});

app.get("/books/:bookname", async (req, res) => {
  try {
    const getAllBooks = await BookModel.find({ author: req.params.bookname }).lean().exec();
    return res.status(200).send({ getAllBooks: getAllBooks });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});

function fetchingBook(req,res,next){
    console.log("Fetching all books")
    return next()

}




app.listen(5000, async () => {
  try {
    await connect();
  } catch (e) {
    console.log(e);
  }

  console.log("list 5000");
});
