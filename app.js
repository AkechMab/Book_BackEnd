//add the dependencies
const Joi = require('joi');
const Express = require('express');
const app = Express();

//parse as JSON 
app.use(Express.json());

const books = [
    {id: 1, title: 'Unit1', author: 'myfriend1'},
    {id: 2, title: 'Unit2', author: 'myfriend2'},
    {id: 3, title: 'Unit3', author: 'myfriend3'},
    {id: 4, title: 'Unit4', author: 'myfriend4'}
]

//HTTP get
app.get('/api/books', (req,res) => {
    res.send(books);
});

app.get('/api/books/:title', (req,res) =>{
     const book = books.find(b => b.title === req.params.title);
     if(!book) 
         return res.status(404).send(`The book title "${req.params.title}" could not be found`);
     res.send(book);
 });

//HTTP post 
app.post('/api/books', (req,res) =>{
    const { error } = validateInput(req.body);

    if( error ) return res.status(400).send(error.details[0].message);

    const book = {
        title: req.body.title
    };

    books.push(book);
    res.send(book);
});

//HTTP put
app.put('/api/books/:title', (req,res) =>{
    const book = books.find(b => b.title === parseInt(req.params.title));
    if(!book) return res.status(404).send(`The book with title ${b.title} could not be found`);
    
    const { error } = validateInput(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    book.title = req.body.title;
    res.send(book);
})

//HTTP delete
app.delete('/api/books/:title', (req,res) =>{
    const book = books.find(b => b.title === parseInt(req.params.title));
    if(!book) return res.status(404).send(`The book with title ${b.title} could not be found`);

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(books);
});


function validateInput(course){
    const schema = {
        title: Joi.string().min(1).max(30).required
    }

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));