var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('mssql');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
console.log('server on ' + port);

var config = {
    server: "DESKTOP-4TJATUJ\\SQLEXPRESS",
    database: "FishingInventory",
    user: "tmarl",
    password: "spider",
    port: 1433
};


app.post('/hook', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var hookCompany = req.body.Hook_Company;
    var hookSize = req.body.Hook_Size;
    var hookType = req.body.Hook_Type;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var sql = "INSERT INTO hooks (company, size, hook_type) VALUES ('" + hookCompany + "', '" + hookSize + "', '" + hookType + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });

});

app.post('/SP', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var SPCompany = req.body.SP_Company;
    var SPSize = req.body.SP_Color;
    var SPType = req.body.SP_Type;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "INSERT INTO soft_plastics (company, size, sp_type) VALUES ('" + SPCompany + "', '" + SPSize + "', '" + SPType + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });
});

app.post('/reel', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var reelCompany = req.body.Reel_Company;
    var reelSize = req.body.Reel_Size;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "INSERT INTO reels (company, size) VALUES ('" + reelCompany + "', '" + reelSize + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });
});

app.post('/line', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var lineCompany = req.body.Line_Company;
    var lineSize = req.body.Line_ibTest;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "INSERT INTO line (company, ib_test) VALUES ('" + lineCompany + "', '" + lineSize + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });
});

app.post('/rod', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var RodCompany = req.body.Rod_Company;
    var RodFeet = req.body.Rod_Feet;
    var RodInches = req.body.Rod_Inches;
    var reelID = req.body.Reel_ID;
    var lineID = req.body.Line_ID;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "INSERT INTO rods (company, feet, inches, reel_id, line_id)" +
            "VALUES ('" + RodCompany + "', '" + RodFeet + "', '" + RodInches + "', '" + reelID + "', '" + lineID + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });
});

app.post('/person', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);
    var FirstName = req.body.Fname;
    var LastName = req.body.Lname;
    var HooksID = req.body.Hooks_ID;
    var SoftPlasticsID = req.body.Soft_Plastics_ID;
    var RodID = req.body.Rods_ID;
    var numOfHooks = req.body.Num_Of_hooks;
    var numOfSoftPlastics = req.body.Num_OF_Soft_Plastics;

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "INSERT INTO person (first_name, last_name, hooks_id, sp_id, rods_id, num_hooks, num_sp)" +
            "VALUES ('" + FirstName + "', '" + LastName + "', '" + HooksID + "', '" + SoftPlasticsID + "', '" + RodID + "', '" + numOfHooks + "', '" + numOfSoftPlastics + "')";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send('Records were updated');
            }
        });

        conn.close();
    });
});

app.get('/addPerson', function (req, res) {
    var conn = new sql.Connection(config);
    var requ = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        var sql = "SELECT * FROM person";

        requ.query(sql, function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.send(recordset);
            }
        });
        conn.close();
    });
});