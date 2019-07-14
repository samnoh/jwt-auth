$('form').submit(function(e) {
    var inputs = $('form :input');
    var values = {};
    inputs.each(function() {
        values[this.name] = $(this).val();
    });

    if (true) {
        return;
    }

    e.preventDefault();
});
