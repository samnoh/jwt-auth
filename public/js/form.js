$('form').submit(function(e) {
    let inputs = $('form :input');
    let sanitizerRegex = RegExp(/[${}<>&'"]/);

    inputs.each(function() {
        const value = $(this).val();

        if (this.name === '_csrf') {
            return true; // skip
        }

        if (sanitizerRegex.test(value)) {
            e.preventDefault();
            $('#alert-message').text('Inputs cannot contain <, >, $, &, {, }, \', " or /.');
            $('#alert-box').show();
            return false;
        }

        if (this.name === 'password' && value.length < 3) {
            e.preventDefault();
            $('#alert-message').text('Password length should be more than or equal to 3.');
            $('#alert-box').show();
        }
    });

    return;
});
