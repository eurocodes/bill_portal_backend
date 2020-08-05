const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
    /*
     * Hash Password Method
     * @param {string} Password
     * @returns {string} returns hashed password
     */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },

    /**
    * Compare Password
    * @param {string} hashPassword
    * @param {string} password
    * @returns {Boolean} returns true or false
    */
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    /**
     * isValidEmail helper method
     * @param {string} email
     * @returns {Boolean} true or false
     */
    isValidEmail(email) {
        return /^\w+\S+@\S+\.[A-Za-z]{2,3}$/gi.test(email)
    },

    /**
     * isValidPassword helper method
     * @param {string} email
     * @returns {Boolean} true or false
     */
    isStrongPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/g.test(password)
    },

    /**
     * Generate Token
     * @param {string} id
     * @param {string} token
     */
    generateToken(id) {
        const token = jwt.sign({
            userid: id,
        }, 'SECRETKEYTOKEN', { expiresIn: '1 hour' });
        return token;
    }
}

module.exports = Helper;