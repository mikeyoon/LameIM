/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/31/11
 * Time: 7:05 PM
 * To change this template use File | Settings | File Templates.
 */

function setupSockets(username) {
    var socket = io.connect('');

    socket.on('chat', function(data) {
        $("#chatwindow").append('<strong>' + data.from + "</strong>: " + data.message + '<br />');
        $("#chatwindow").animate({ scrollTop: $("#chatwindow").prop("scrollHeight") }, 3000);
    });

    socket.on('buddy-disconnect', function(data) {
        $('#buddy_' + data.username).remove().appendTo($('.offline'));
    });

    socket.on('buddy-connect', function(data) {
        $('#buddy_' + data.username).remove().appendTo($('.online'));
    });

    socket.on('buddy-away', function(data) {

    });

    socket.on('buddy-return', function(data) {

    });

    $('#select-buddy').change(function() {
        $.getJSON('/home/getRecentHistory/' + $(this).val(), function(data) {
            $('#chatwindow').html('');
            data.forEach(function(obj) {
                $('#chatwindow').append('<strong>' + obj.from + ':</strong> ' + obj.message + '<br />');
            });
        });
    });

    $('#button-send').click(function () {
        $("#chatwindow").append('<strong>' + username + '</strong>: ' + $('#message-box').val() + '<br />');
        socket.emit('message', { to: $('.buddylist .selected').html(), message: $('#message-box').val() });
        $('#message-box').val('');

        $("#chatwindow").animate({ scrollTop: $("#chatwindow").prop("scrollHeight") }, 3000);
    });

    $('#button-add-buddy').click(function() {
        var buddy = $('#new-buddy').val();

        $.post('/home/addBuddy/' + buddy, function(data) {
            if (data.success == true)
            {
                $('#select-buddy').append('<option>' + buddy + '</option>')
            }
        });
    });

    $('.list div').live('click', function() {
        $('.list div').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.list div').live('dblclick', function() {
        $.getJSON('/home/getRecentHistory/' + $(this).html(), function(data) {
            $('#chatwindow').html('');
            data.forEach(function(obj) {
                $('#chatwindow').append('<strong>' + obj.from + ':</strong> ' + obj.message + '<br />');
            });
        });
    });
}
