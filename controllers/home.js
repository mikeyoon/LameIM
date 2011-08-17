/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    index: function index(req, res) {
        console.log("called home/index");
        res.render(req.params.controller + '/' + req.params.action);
    }    
};