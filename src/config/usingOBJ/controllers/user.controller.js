const { pool } = require('../../usingDB/connection');
const Helper = require('../../usingDB/controllers/Helper');
const TimeStamp = require('../../usingDB/controllers/DateTime');

//Users
const UserCtrl = {
    /**
     * Create New User
     * @param {object} req
     * @param {object} res
     * @param {object} article object
     */
    async createUser(req, res) {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).send({
                message: "Some values are missing"
            });
        }

        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({
                message: 'Please enter a valid email address',
            });
        }

        if (!Helper.isStrongPassword(req.body.password)) {
            return res.status(400).send({
                message: 'Please enter a strong password',
            })
        }
        const hashPassword = Helper.hashPassword(req.body.password);
        const createdOn = TimeStamp.generateDateTime();
        const modifiedOn = TimeStamp.generateDateTime();
        console.log(hashPassword)
        console.log(createdOn)

        const {
            username, firstName, lastName, email,
        } = req.body;
        console.log(username)

        try {
            // const createQuery = `INSERT INTO users (username, firstName, lastName, email, password, createdOn, modifiedOn)
            // VALUES($1, $2, $3, $4, $5, $6, $7) returning *`
            console.log("This is running")

            const { rows } = await pool.query(`INSERT INTO users (username, firstName, lastName, email, password, createdOn, modifiedOn)
            VALUES($1, $2, $3, $4, $5, $6, $7) returning *`, [
                username, firstName, lastName, email, hashPassword, createdOn, modifiedOn
            ])
            console.log("Running upto here")
            const userid = rows[0].user_id;
            const token = Helper.generateToken(userid);
            return res.status(201).send({
                status: 'success',
                data: {
                    message: 'User account successfully created',
                    token,
                    userid,
                },
            });
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    error: 'Username taken or email already exist',
                });
            }
            return res.status(400).send(error);
        }
    },

    /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
    async login(req, res) {
        if (!req.body.email && !req.body.username) {
            return res.status(400).send({ message: 'Some values are missing' });
        }
        if (!req.body.password) {
            return res.status(400).send({ message: 'Some values are missing' });
        }
        const emailQuery = 'SELECT * FROM users WHERE email = $1';
        const usernameQuery = 'SELECT * FROM users WHERE username = $1';

        if (req.body.email) {
            try {
                const { rows } = await pool.query(emailQuery, [req.body.email]);
                if (!rows[0]) {
                    console.log("Email incorrect")
                    return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                }
                if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                    console.log("Password incorrect")
                    return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                }
                const userid = rows[0].userid;
                const token = Helper.generateToken(userid);
                return res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        userid,
                    },
                });
            } catch (error) {
                return res.status(400).send({
                    status: 'error',
                    error,
                });
            }
        } else {
            try {
                const { rows } = await pool.query(usernameQuery, [req.body.username]);
                if (!rows[0]) {
                    console.log("Username incorrect")
                    return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                }
                if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                    console.log("Password for username incorrect")
                    return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                }
                const userid = rows[0].userid;
                const token = Helper.generateToken(userid);
                return res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        userid,
                    },
                });
            } catch (error) {
                return res.status(400).send({
                    status: 'error',
                    error,
                });
            }
        }
    },
}

module.exports = UserCtrl;