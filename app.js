const books = require('./data/books.json');
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Lanza una fucion GET http://localhost:3000/  --> Ruta/ principal
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//http://localhost:3000/books/all/
// Crea una ruta /all para obtener todos los libros

// app.get("/all", (req, res) => {
//     res.status(200).json(books);
// });

app.get("/all", (req, res) => {
    res.status(200).json(
        books
    );
});

//Crea una ruta /first para obtener el primer libro
//http://localhost:3000/books/first/

app.get("/books/first", (req, res) => {
    res.status(200).json(books[0]);
});

//Crea una ruta /last para obtener el último libro
//http://localhost:3000/books/last/

app.get("/books/last", (req, res) => {
    res.status(200).json(books[books.length - 1]);
});

//Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
//http://localhost:3000/books/middle/

app.get("/books/middle", (req, res) => {
    res.status(200).json(books[books.length / 2]);
});

//Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
//http://localhost:3000/books/author/dante-alighieri

app.get("/books/author/dante-alighieri", (req, res) => {
    const book = books.find(libro => libro.author == 'Dante Alighieri');
    res.status(200).json({ title: book.title })
});

//Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
//http://localhost:3000/books/country/charles-dickens

app.get("/books/country/charles-dickens", (req, res) => {
    const book = books.find(libro => libro.author == 'Charles Dickens');
    res.status(200).json({ country: book.country })
});

// Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
//http://localhost:3000/books/year&pages/cervantes

app.get("/books/year&pages/cervantes", (req, res) => {
    const book = books.find(libro => libro.author == 'Miguel de Cervantes');
    res.status(200).json({ years: book.year, pages : book.pages })
});

// Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
//http://localhost:3000/books/country/count/spain

app.get("/books/country/count/spain", (req, res) => {
    const spanishBooks = books.filter(libro => libro.country == 'Spain');
    res.status(200).json({ count: spanishBooks.length })
});

// Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
//http://localhost:3000/books/country/at-least/germany

app.get("/books/country/at-least/germany", (req, res) => {
    const germanyBooks = books.filter(libro => libro.country == 'Germany');
    if (germanyBooks.length === 0) {
        res.status(200).json(false)
    }
    res.status(200).json(true)
});

//Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
//http://localhost:3000/books/pages/all-greater/200

app.get("/books/pages/all-greater/200", (req, res) => {
    const moreThan200 = books.filter(libro => libro.pages > 200);
    if (moreThan200.length > 0) {
        res.status(200).json(true)
    }
    res.status(200).json(false)
});



// Para ruta no existente
app.use("*",(req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
