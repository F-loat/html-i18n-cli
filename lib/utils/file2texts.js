const file2texts = (path) => Object.entries(require(path)).map(([origin, local]) => ({ origin, local }));

module.exports = file2texts;
