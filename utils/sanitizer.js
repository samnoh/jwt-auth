const mongoSanitizer = text => {
    return text.replace(/[\/<>${}:]/g, '');
};

module.exports = mongoSanitizer;
