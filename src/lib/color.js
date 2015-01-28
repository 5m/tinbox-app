function isDark(color) {
    var [r, g, b] = parseColor(color);

    return Math.sqrt(
        Math.pow(0.299 * r, 2) +
        Math.pow(0.587 * g, 2) +
        Math.pow(0.114 * b, 2)) < 170 / 2;
}

function parseColor(input) {
    var div = document.createElement('div'),
        matches;

    div.style.color = input;

    var computed = getComputedStyle(div).color || div.style.color;

    matches = computed
        .match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

    if(matches) {
        return matches.slice(1);
    } else {
        throw new Error('Color ' + input + ' could not be parsed.');
    }
}

module.exports.isDark = isDark;