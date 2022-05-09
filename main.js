const fs = require('fs');
const {MongoClient} = require('mongodb');
'use strict';
const excelToJson = require('convert-excel-to-json');


var uploadData = new Array();
var result = excelToJson({
    sourceFile: 'people.xlsx',
    columnToKey: {
        A: 'name',
        B: 'age'
    }

});
result.Tabelle1.shift();
result = result.Tabelle1;
var jsonResult = JSON.stringify(result);

fs.writeFile('people.json', jsonResult, (err) => {
    if (err) {
        throw err;
    }
});

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createMultipleListings(client, newListings){
  const result = await client.db("database name").collection("table/collection name").insertMany(newListings);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

async function main(){
    const uri = "mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        for (var i = 0; i < result.length; i++) {
          uploadData.push({name: result[i].name, age: result[i].age})
        }

        console.log(uploadData);

        await createMultipleListings(client, uploadData);


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
