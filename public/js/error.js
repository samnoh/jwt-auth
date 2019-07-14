let seconds = 5;

setTimeout(() => {
    window.location = '/';
}, seconds * 1000);

setInterval(() => {
    document.querySelector('#secNum').innerHTML = ' ' + --seconds;
}, 1000);
