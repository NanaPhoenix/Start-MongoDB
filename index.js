const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017/users';
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('Не удалось установить соединение к серверу MongoDB!');
  } else {
    console.log('Соединение установлено c ', url);

	const collection = db.collection('users');
    var usersArr = [
        {name: 'Flinn',	age: 23},
        {name: 'Anakin',   age: 12},
        {name: 'Obi-Wan',   age: 31},
        {name: 'Darkwing Duck',   age: 18},
        {name: 'Winnie Pooh',  age: 8},
    ];

    collection.insert(usersArr, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          collection.find({}, {_id: 0}).toArray(function(err, res) {
            if (err) {
              console.log(err);
            } else if (res.length) {
              console.log('Добавленные пользователи:');
              console.log(res);
            } else {
              console.log('Не найдено!');
            }
          });

          collection.update({age: {$gte: 18}}, {'$set': {name: 'Update Multipass'}}, {multi: true}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              collection.find({}, {_id: 0}).toArray(function(err, res) {
                if (err) {
                  console.log(err);
                } else if (res.length) {
                  console.log('После изменения:');
                  console.log(res);
                  collection.remove({name: 'Update Multipass'});
                } else {
                  console.log('Не найдено!');
                }
                collection.remove();
                db.close();
              });
            }
          });
        }
      });
  }
});
