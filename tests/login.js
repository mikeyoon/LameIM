/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 9/7/11
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
 */

var tobi = require('tobi');

module.exports.boot = function(app) {

    var browser = tobi.createBrowser(3000, 'localhost');
    browser.get('/', function(res, $) {
        $('#form1').fill({ username: 'test3', password: 'test' });
        $('input[type=submit]').click(function(res, $) {
            //$('#chatwindow').should.have.one('br');
        });
    });
};