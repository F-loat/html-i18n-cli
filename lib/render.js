const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const render = require('posthtml-render')
const html2texts = require('./utils/html2texts')

module.exports = (htmlfile, textsfile) => {
  const htmlpath = path.join(process.cwd(), htmlfile)
  const textspath = path.join(process.cwd(), textsfile)
  const outpath = path.join(process.cwd(), `translated-${htmlfile}`)
  const html = fs.readFileSync(htmlpath).toString()

  const texts = require(textspath)
  const { texts: originTexts, tree } = html2texts(html)

  originTexts.forEach((item, index) => {
    lodash.set(tree, item.paths, texts[index].local)
  })

  const newHtml = render(tree)

  fs.writeFileSync(outpath, newHtml)
}
