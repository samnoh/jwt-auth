$('form').submit(function(e) {
    e.preventDefault();
    var inputs = $('form :input');
    var values = {};
    inputs.each(function() {
        values[this.name] = $(this).val();
    });
    $('form').submit();
});
