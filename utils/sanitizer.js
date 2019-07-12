const mongoSanitizer = body => {
    if (typeof body !== 'object') {
        return;
    }

    const newBody = { ...body };

    for (key in newBody) {
        let value = newBody[key];
        newBody[key] = value.replace(/[\/<>${}:]/g, '');
    }

    return newBody;
};

module.exports = mongoSanitizer;
