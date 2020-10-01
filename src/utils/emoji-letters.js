const genLetterAsEmoji = letter => {
    return String.fromCodePoint(letter.toUpperCase().codePointAt(0) - 65 + 0x1f1e6);
}

module.exports = { genLetterAsEmoji };