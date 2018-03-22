function multilineParse(fn) {

  const reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

    if (typeof fn !== 'function') { throw new TypeError('Expected a function'); }
    var match = reCommentContents.exec(fn.toString());
    if (!match) { throw new TypeError('Multiline comment missing.'); }
    return match[1];

}
export default multilineParse;
