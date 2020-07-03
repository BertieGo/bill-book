const express = require('express');
const path = require('path');
const csv = require('csvtojson');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const {getMonthTimeRange} = require('./utils/time');

const app = express();

let database = null;
const TABLE_BILL_LIST = 'bill_list';
const TABLE_BILL_CATEGORIES = 'bill_categories';

const RESPONSE_CODE = {
    SUCCESS: 0,
    FAIL: 1
};

const tableList = [
    {
        name: TABLE_BILL_LIST,
        csvPath: './csv/bill.csv',
    },
    {
        name: TABLE_BILL_CATEGORIES,
        csvPath: './csv/categories.csv',
    },
];

const isDockerEnv = process.env.NODE_ENV === 'docker';

const HOST = isDockerEnv ? 'database' : 'localhost';

const url = `mongodb://${HOST}:27017/bill`;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function responseMiddleware(code, data) {
    return {
        code,
        data,
    }
}

function readCSV2Json(csvPath) {
    return new Promise((resolve) => {
        resolve(csv().fromFile(csvPath));
    });
}

function billDataMaker(data) {
    data.forEach((item) => {
        item.time = new Date(parseInt(item.time, 10));
        item.type = parseInt(item.type, 10);

        const mount = Number(item.amount);

        item.amount = Number.isInteger(mount) ? parseInt(mount, 10) : parseFloat(mount.toFixed(2));
    });

    return data;
}

function createCollection(collection, cb) {
    return new Promise((resolve) => {
        database.createCollection(collection, function (err) {
            if (err) throw err;
            resolve();
        });
    })
}

function deleteCollection(collection) {
    database.collection(collection).deleteMany({});
}

function insertData(collection, data) {
    const d = billDataMaker(data);
    return new Promise((resolve) => {
        database.collection(collection).insertMany(d, function (err) {
            if (err) throw err;
            resolve();
        });
    })
}

function initTables() {
    tableList.forEach((table) => {
        createCollection(table.name).then(() => readCSV2Json(table.csvPath)).then((res) => insertData(table.name, res))
    })
}

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    database = db.db("bill");
    // deleteCollection('bill_categories')
    // deleteCollection('bill_list')
    initTables();
});

app.get('/api/bill/categories', function (req, res) {
    database.collection(TABLE_BILL_CATEGORIES).aggregate([{$project: {_id: 0}}]).toArray((err, result) => {
        if (err) {
            res.send((responseMiddleware(RESPONSE_CODE.FAIL, err)));
            throw err;
        }
        res.send(responseMiddleware(RESPONSE_CODE.SUCCESS, result))
    });
})

app.get('/api/bill', function (req, res) {

    const {category, time} = req.query;

    const matchOptions = {};

    if (time) {
        const [year, month] = time.split('-');
        const range = getMonthTimeRange(year, month);
        matchOptions.time = {
            $gte: new Date(range.startTime),
            $lt: new Date(range.endTime)
        }
    }

    if (category) {
        matchOptions.category = category;
    }

    database.collection(TABLE_BILL_LIST).aggregate([
        {
            $lookup:
                {
                    from: 'bill_categories',
                    localField: 'category',
                    foreignField: 'id',
                    as: 'detail'
                }
        },
        {
            $unwind: {
                path: "$detail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: matchOptions
        },
        {
            $project: {
                _id: 0,
                title: '$detail.name',
                amount: '$amount',
                type: '$type',
                time: '$time',
                category: '$category'
            }
        },
    ]).sort({time: 1}).toArray(function (err, result) {
        if (err) {
            res.send((responseMiddleware(RESPONSE_CODE.FAIL, err)));
            throw err;
        }

        res.send((responseMiddleware(RESPONSE_CODE.SUCCESS, result)));
    });
});

app.post('/api/bill', function (req, res) {
    const {body} = req;

    database.collection(TABLE_BILL_CATEGORIES).find({id: body.category}).next().then((target) => {
        body.type = target.type;
        const data = Array.isArray(body) ? body : [body];
        insertData(TABLE_BILL_LIST, data);
        res.send(responseMiddleware(RESPONSE_CODE.SUCCESS, '添加成功'));
    })
})

app.listen(8800, function () {
    console.log('listening on port 8800!');
});
