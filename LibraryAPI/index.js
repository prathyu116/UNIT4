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
    author: [
      {
        type: String,
      },
    ],
    category: { type: String, required: true },
    stock: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);
const BookModel = mongoose.model("book", BookSchema);

//==================================Create Book Schema==============================
const AuthorSchema = mongoose.Schema(
  {
    firstName: String,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

// create a model
const AuthorModel = mongoose.model("author", AuthorSchema);

//============================create section schema=========================
const SectionSchema = mongoose.Schema(
  {
    sectionName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const SectionModel = mongoose.model("section", SectionSchema);

app.get("/books", async (req, res) => {
  try {
    const getAllBooks = await BookModel.find().lean().exec();
    return res.status(200).send({ getAllBooks: getAllBooks });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});

//get book by author name
app.get("/books/:authorName", async (req, res) => {
  try {
    const getAllBooks = await BookModel.find({ author: req.params.authorName }).lean().exec();
    return res.status(200).send({ getAllBooks: getAllBooks });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});
//get all book whichIs checkedOut(stcok==true)
app.get("/books/stock/:stock", async (req, res) => {
  try {
    const getAllBooks = await BookModel.find({ stock: req.params.stock }).lean().exec();
    return res.status(200).send({ getAllBooks: getAllBooks });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});


app.post("/books", async (req, res) => {
  try {
    const newBook = await BookModel.create(req.body);
    return res.status(201).send({ newBook: newBook });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//=================AUTH CRUD============================
app.get("/authors", async (req, res) => {
  try {
    const getAllAuthors = await AuthorModel.find().lean().exec();
    return res.status(200).send({ getAllAuthors: getAllAuthors });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const author = await AuthorModel.create(req.body);
    return res.status(201).send({ author: author });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//=======================section CRUD=======================
app.get("/sections", async (req, res) => {
  try {
    const getAllSection = await SectionModel.find().lean().exec();
    return res.status(200).send({ getAllSection: getAllSection });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});
//=======================find books in a section==============================
app.get("/sections/:secName", async (req, res) => {
  try {
    const getAllSection = await BookModel.find({category:req.params.secName}).lean().exec();
    return res.status(200).send({ getAllSection: getAllSection });
  } catch (err) {
    return res.status(500).send({ message: "Some thing wrog" });
  }
});

app.post("/sections", async (req, res) => {
  try {
    const section = await SectionModel.create(req.body);
    return res.status(201).send({ section: section });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



app.listen(5000, async () => {
  try {
    await connect();
  } catch (e) {
    console.log(e);
  }

  console.log("list 5000");
});
