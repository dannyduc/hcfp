var _ = require('ramda');

// teaser updates DOM

function teaser(size, elt) {
    setText(elt, slice(0, size, text(elt)));
}

map(teaser(50), all('p'));

// merely calculates
var teaser = slice(0);
map(compose(setText, teaser(50), text), all('p'));