//Some notes
//.pretty(), .count(), .update(), .remove() = deprecated

//InsertRow
db.TestCollection.insert({
    title: "Post One",
    body: "Body of post one",
    category: "News",
    tags: ["news", "events"],
    user: {
        name: "John Doe",
        status: "author",
    },
    date: Date(),
});

//Insert multiple rows at same time
db.TestCollection.insertMany([
    {
        title: "Post Two",
        body: "Body of post two",
        category: "Technology",
        date: Date(),
    },
    {
        title: "Post Three",
        body: "Body of post three",
        category: "News",
        date: Date(),
    },
    {
        title: "Post Four",
        body: "Body of post three",
        category: "Entertainment",
        date: Date(),
    },
]);

//Get all rows (deprecated)
db.TestCollection.find();

//Get all rows (formatted)
db.TestCollection.find().pretty();

//Find rows
db.TestCollection.find({ category: "News" });

//Sorting rows
//ascending order
db.TestCollection.find().sort({ title: 1 }).pretty();
//Descending order
db.TestCollection.find().sort({ title: -1 }).pretty();

//Count rows
db.TestCollection.find().count();
//Count row with specific value
db.TestCollection.find({ category: "news" }).count();

//Limit rows
db.TestCollection.find().limit(2).pretty();

//Chaining
db.TestCollection.find().limit(2).sort({ title: 1 }).pretty();

//Using ForEach
db.TestCollection.find().forEach(function (doc) {
    print("Blog Post: " + doc.title);
});

//Find only one row (first one)
db.TestCollection.findOne({ category: "News" });

//Find using specific fields
db.TestCollection.find(
    { title: "Post One" },
    {
        title: 1,
        author: 1,
    }
);

//Update row (every field) (MongoInvalidArgumentError: Update document requires atomic operators. Doesn't work anymore)
db.TestCollection.update(
    { title: "Post Two" },
    {
        title: "Post Two",
        body: "New body for post 2",
        date: Date(),
    },
    {
        upsert: true,
    }
);

//Update specific fields
db.TestCollection.update(
    { title: "Post Two" },
    {
        $set: {
            body: "Body for post 2",
            category: "Technology",
        },
    }
);

//Increment field
db.TestCollection.update(
    { title: "Post Two" },
    {
        $inc: {
            views: 5,
        },
    }
);

//Rename field
db.TestCollection.update(
    { title: "Post Two" },
    {
        $rename: {
            likes: "views",
        },
    }
);

//Remove row
db.TestCollection.remove({ title: "Post Four" });

//Sub-Documents
db.TestCollection.update(
    { title: "Post One" },
    {
        $set: {
            comments: [
                {
                    body: "Comment One",
                    user: "Mary Williams",
                    date: Date(),
                },
                {
                    body: "Comment Two",
                    user: "Harry White",
                    date: Date(),
                },
            ],
        },
    }
);

//Find using a element in array
db.TestCollection.find({
    comments: {
        $elemMatch: {
            user: "Mary Williams",
        },
    },
});

//Create index
db.TestCollection.createIndex({ title: "text" });

//Text search
db.TestCollection.find({
    $text: {
        $search: '"Post O"',
    },
});

// < or >
db.TestCollection.find({ views: { $gt: 2 } });
db.TestCollection.find({ views: { $gte: 7 } });
db.TestCollection.find({ views: { $lt: 7 } });
db.TestCollection.find({ views: { $lte: 7 } });
