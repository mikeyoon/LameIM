/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/21/11
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(username, password, email, firstName, lastName, buddies) {
    if (username !== undefined) this.username = username;
    if (password !== undefined) this.password = password;
    if (email !== undefined) this.email = email;
    if (firstName !== undefined) this.firstName = firstName;
    if (lastName !== undefined) this.lastName = lastName;
    if (buddies !== undefined) this.buddies = buddies;
};

/**
 * Fill in the values of this object from a Mongo object
 * @param obj
 */
module.exports.prototype.loadFromMongo = function(obj) {
    for (val in obj) {
        this[val] = obj[val];
    }
};