let seconds = 3;

setTimeout(() => {
    window.location = '/auth/login';
}, seconds * 1000);

setInterval(() => {
    document.querySelector('#secNum').innerHTML = ' ' + --seconds;
}, 1000);
