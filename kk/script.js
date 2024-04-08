function hsvToRgb(h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
    if (s === 0) {
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default: // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function convertToRGBFromHSV() {
    var hue = parseInt(document.getElementById('hue').value);
    var saturation = parseInt(document.getElementById('saturation').value) / 100;
    var value = parseInt(document.getElementById('value').value) / 100;

    var rgb = hsvToRgb(hue, saturation, value);

    var resultDiv = document.getElementById('result_rgb_from_hsv');
    resultDiv.innerHTML = `
        <p><strong>Red:</strong> ${rgb[0]}</p>
        <p><strong>Green:</strong> ${rgb[1]}</p>
        <p><strong>Blue:</strong> ${rgb[2]}</p>
    `;

    var colorBox = document.getElementById('colorBox_hsv');
    colorBox.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

document.getElementById('convertRGBBtn').addEventListener('click', convertToRGBFromHSV);


function rgbToCmyk(r, g, b) {
    // Convert RGB to CMYK
    var c = 1 - (r / 255);
    var m = 1 - (g / 255);
    var y = 1 - (b / 255);
    
    var k = Math.min(c, Math.min(m, y));
    
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    
    return [c, m, y, k];
}

function convertToCMYKFromRGB() {
    var red = parseInt(document.getElementById('red_cmyk').value);
    var green = parseInt(document.getElementById('green_cmyk').value);
    var blue = parseInt(document.getElementById('blue_cmyk').value);

    var cmyk = rgbToCmyk(red, green, blue);

    var resultDiv = document.getElementById('result_cmyk');
    resultDiv.innerHTML = `
        <p><strong>Cyan:</strong> ${cmyk[0]}</p>
        <p><strong>Magenta:</strong> ${cmyk[1]}</p>
        <p><strong>Yellow:</strong> ${cmyk[2]}</p>
        <p><strong>Black (Key):</strong> ${cmyk[3]}</p>
    `;
}

document.getElementById('convertCMYKBtn').addEventListener('click', convertToCMYKFromRGB);

function cmykToRgb(c, m, y, k) {
    var r = 255 * (1 - c) * (1 - k);
    var g = 255 * (1 - m) * (1 - k);
    var b = 255 * (1 - y) * (1 - k);
    return [Math.round(r), Math.round(g), Math.round(b)];
}

function convertToRGBFromCMYK() {
    var cyan = parseFloat(document.getElementById('cyan').value);
    var magenta = parseFloat(document.getElementById('magenta').value);
    var yellow = parseFloat(document.getElementById('yellow').value);
    var black = parseFloat(document.getElementById('black').value);

    var rgb = cmykToRgb(cyan, magenta, yellow, black);

    var resultDiv = document.getElementById('result_rgb_from_cmyk');
    resultDiv.innerHTML = `
        <p><strong>Red:</strong> ${rgb[0]}</p>
        <p><strong>Green:</strong> ${rgb[1]}</p>
        <p><strong>Blue:</strong> ${rgb[2]}</p>
    `;

    var colorBox = document.getElementById('colorBox_cmyk');
    colorBox.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

document.getElementById('convertRgbBtn').addEventListener('click', convertToRGBFromCMYK);


function convertCMYKtoRGB() {
    var cyan = parseInt(document.getElementById('cyan').value);
    var magenta = parseInt(document.getElementById('magenta').value);
    var yellow = parseInt(document.getElementById('yellow').value);
    var black = parseInt(document.getElementById('black').value);

    var red = 255 * (1 - (cyan / 100)) * (1 - (black / 100));
    var green = 255 * (1 - (magenta / 100)) * (1 - (black / 100));
    var blue = 255 * (1 - (yellow / 100)) * (1 - (black / 100));

    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

    var resultDiv = document.getElementById('result_cmyk');
    resultDiv.innerHTML = `
        <p><strong>Red:</strong> ${red}</p>
        <p><strong>Green:</strong> ${green}</p>
        <p><strong>Blue:</strong> ${blue}</p>
    `;

    var colorBox = document.getElementById('colorBox_cmyk');
    colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

document.getElementById('convertCMYKBtn').addEventListener('click', convertCMYKtoRGB);


function convertToGrayscale() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    var grayscale = (red + green + blue) / 3;

    var resultDiv = document.getElementById('result_grayscale');
    resultDiv.innerHTML = `
        <p><strong>Grayscale Value:</strong> ${grayscale}</p>
    `;
}

document.getElementById('convertToGrayscaleBtn').addEventListener('click', convertToGrayscale);
