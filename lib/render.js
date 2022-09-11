const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const render = require('posthtml-render')
const html2texts = require('./utils/html2texts')
const file2texts = require('./utils/file2texts')

module.exports = (htmlfile, jsonfile) => {
  const htmlpath = path.join(process.cwd(), htmlfile)
  const textspath = path.join(process.cwd(), jsonfile)
  const outpath = path.join(process.cwd(), path.dirname(htmlfile), `translated-${path.basename(htmlfile)}`)
  const html = fs.readFileSync(htmlpath).toString()

  const texts = file2texts(textspath)
  const { texts: originTexts, tree } = html2texts(html)

  originTexts.forEach((item, index) => {
    lodash.set(tree, item.paths, texts[index] && texts[index].local)
  })

  const newHtml = render(tree)

  fs.writeFile(outpath, newHtml, (err) => {
    if (err) console.log(err)
    console.log(`还原成功，已生成文件 ${outpath}`)
  })
}
