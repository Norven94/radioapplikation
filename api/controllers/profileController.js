const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../radioDB.db"));

const getFavoriteChannels = (req, res) => {
    let query = `SELECT channelId, name FROM users JOIN favoriteChannels, usersXchannels
    ON users.id = usersXchannels.usersId 
    AND favoriteChannels.channelId = usersXchannels.channelsId
    WHERE users.id = $usersId`
    let params = {$usersId: req.params.usersId}
    db.all(query, params, (err, channels) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }
        res.json(channels);
    });
}
const getFavoritePrograms = (req, res) => {
    let query = `SELECT programId, name FROM users JOIN favoritePrograms, usersXprograms
    ON users.id = usersXprograms.usersId 
    AND favoritePrograms.programId = usersXprograms.programsId
    WHERE users.id = $usersId`
    let params = {$usersId: req.params.usersId}
    db.all(query, params, (err, channels) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }
        res.json(channels);
    });
}

const addFavoriteChannel = (req, res) => {
    //Check if channel already exists
    let query = `SELECT * FROM favoriteChannels WHERE channelId = $channelId`;
    let params = { $channelId: req.body.channelId };
    db.get(query, params, (err, channelExist) => {
        if (channelExist) {
            console.log("channel already exist in favoriteChannels table");
            //If channel already exists just try to connect the user with the channel
            query = `INSERT INTO usersXchannels (usersId, channelsId) VALUES ($usersId, $channelsId)`
            params = {
                $usersId: req.body.usersId,
                $channelsId: req.body.channelsId
            }
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                res.json({ success: "Favorite channel and user have been connected", lastID: this.lastID });
            });
        } else {
            //If channel does not already exists, then first add it to the favoriteChannels table
            query = `INSERT INTO favoriteChannels (channelId, name) VALUES ($channelId, $name)`
            params = {
                $channelId: req.body.channelId,
                $name: req.body.name
            }
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                //After the channel have been added to the channel table then connect the channel and the user
                query = `INSERT INTO usersXchannels (usersId, channelsId) VALUES ($usersId, $channelsId)`
                params = {
                    $usersId: req.body.usersId,
                    $channelsId: req.body.channelsId
                }
                db.run(query, params, function (err) {
                    if (err) {
                        res.status(400).json({ error: err });
                        return;
                    }
                    res.json({ success: "Favorite channel and user have been connected", lastID: this.lastID });
                });
            });
        }
    });
}

const addFavoriteProgram = (req, res) => {
    //Check if program already exists
    let query = `SELECT * FROM favoritePrograms WHERE programId = $programId`;
    let params = { $programId: req.body.programId };
    db.get(query, params, (err, programExist) => {
        if (programExist) {
            console.log("program already exist in favoritePrograms table");
            //If program already exists just try to connect the user with the program
            query = `INSERT INTO usersXprograms (usersId, programsId) VALUES ($usersId, $programsId)`
            params = {
                $usersId: req.body.usersId,
                $programsId: req.body.programsId
            }
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                res.json({ success: "Favorite program and user have been connected", lastID: this.lastID });
            });
        } else {
            //If program does not already exists, then first add it to the favoritePrograms table
            query = `INSERT INTO favoritePrograms (programId, name) VALUES ($programId, $name)`
            params = {
                $programId: req.body.programId,
                $name: req.body.name
            }
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                //After the program have been added to the program table then connect the program and the user
                query = `INSERT INTO usersXprograms (usersId, programsId) VALUES ($usersId, $programsId)`
                params = {
                    $usersId: req.body.usersId,
                    $programsId: req.body.programsId
                }
                db.run(query, params, function (err) {
                    if (err) {
                        res.status(400).json({ error: err });
                        return;
                    }
                    res.json({ success: "Favorite program and user have been connected", lastID: this.lastID });
                });
            });
        }
    });
}

module.exports = {
    getFavoriteChannels,
    getFavoritePrograms,
    addFavoriteChannel,
    addFavoriteProgram
};