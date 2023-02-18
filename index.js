const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lqyancf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const blogsCollection = client.db('redux-blog-app').collection('blogs');

    app.get('/blogs', async (req, res) => {
      const blogs = await blogsCollection.find({}).toArray();
      res.send(blogs);
    });

    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const blog = await blogsCollection.findOne({ _id: ObjectId(id) });
      res.send(blog);
    });

    app.post('/blogs', async (req, res) => {
      const blog = req.body;
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });

    app.delete('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const result = await blogsCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.put('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const blog = req.body;
      const option = { upsert: true };
      const updatedBlog = {
        $set: {
          title: blog.title,
          desc: blog.desc,
        },
      };
      const result = await blogsCollection.updateOne(
        filter,
        updatedBlog,
        option
      );
      res.send(result);
    });
  } finally {
  }
};

run().catch(err => console.error(err));

app.get('/', async (req, res) =>
  res.send('<h1>Redux blog app server is running</h1>')
);

app.listen(port, () =>
  console.log(`Redux blog app server is running on port:${port}`)
);
