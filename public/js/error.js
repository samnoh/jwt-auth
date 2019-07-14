let seconds = 3;

setTimeout(() => {
    $(location).attr('href', '/auth/login');
}, seconds * 1000);

setInterval(() => {
    $('#secNum').text(' ' + --seconds);
}, 1000);
