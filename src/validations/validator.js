const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    if (typeof value != "string") return false;
    return true;
};

const checkUrl = function (value) {
    let urlRegex = /^(?:(?:(?:https?|http):)?\/\/.*\.(?:png|gif|webp|com|in|org|co|co.in|net|jpeg|jpg))/i;
    if (urlRegex.test(value))
        return true;
}

module.exports = { isValid, checkUrl };