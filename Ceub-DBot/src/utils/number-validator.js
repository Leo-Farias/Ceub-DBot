const isPositiveInt = (str) => /^\+?(0|[1-9]\d*)$/.test(str);

module.exports = { isPositiveInt };