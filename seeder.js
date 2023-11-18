let mysql = require('mysql');

let connection = mysql.createConnection({
    host:        'localhost',
    user:        'root',
    password:    '',
    database:    'db_express_api'
  });

connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connection Succuessfully!');
    }
  });

let JOKES = [
    { 
        author: 'John Doe',
        jokes: 'Pergi ke pasar beli roti, bolehkah minta topi',
        rating: 5
    },
    { 
        author: 'Budi Doremi',
        jokes: 'Pergilah ke sungai, jangan tenggelam',
        rating: 3
    },
    { 
        author: 'Sukiman',
        jokes: 'Jalan-jalan ke pulau Rote, maukah tempe?',
        rating: 10
    },
    { 
        author: 'Sukijat',
        jokes: 'Auah Gelap, maukah kau jadi lampu?',
        rating: 8
    },
    { 
        author: 'Sika Dameratu',
        jokes: 'Ikan hiu makan tomat, maukah kau jadi teman?',
        rating: 8
    },
    { 
        author: 'Tar Gezer',
        jokes: 'Kamu mau jadi pacar saya?',
        rating: 1
    },
    { 
        author: 'Pardede',
        jokes: 'Makan malam makan kedondong, maukah kau jadi teman hidupku?',
        rating: 3
    },
    { 
        author: 'Mang Oleh',
        jokes: 'Hidup itu indah, maukah kau jadi pacar saya?',
        rating: 8
    },
    
];

function insertJoke(author, jokes, rating) {
    connection.query(`INSERT INTO jokes (author, jokes, rating) VALUES ('${author}', '${jokes}', ${rating})`, function (err, rows) {
        if (err) throw err;
        console.log('Data Jokes Berhasil diinput!');
    });
}

JOKES.forEach(joke => insertJoke(joke.author, joke.jokes, joke.rating));

connection.end();

