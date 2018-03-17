const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//to accept incoming POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//sets up a directory called "public" that we'll serve, just like an ordinary web server
app.use(express.static('public'))

let posts = [];
let id = 0;

app.get('/api/posts', (req, res) => {
  res.send(posts);
});

app.post('/api/posts', (req, res) => {
  id = id + 1;
  let post = {id:id, text:req.body.text, date:req.body.date};
  posts.push(post);
  res.send(post);
});

app.put('/api/posts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let postsMap = posts.map(post => { return post.id; });
  let index = postsMap.indexOf(id);
  let post = posts[index];
  post.text = req.body.text;
  post.date = req.body.date;
  if (req.body.orderChange) {
    let indexTarget = postsMap.indexOf(req.body.orderTarget);
    posts.splice(index,1);
    posts.splice(indexTarget,0,post);
  }
  res.send(post);
});

app.delete('/api/posts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = posts.map(post => { return post.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that post doesn't exist");
    return;
  }
  posts.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
