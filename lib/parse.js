const fs = require('fs')
const path = require('path')
const html2texts = require('./utils/html2texts')

module.exports = (file) => {
  const filepath = path.join(process.cwd(), file)
  const outpath = path.join(process.cwd(), 'texts.json')
  const html = fs.readFileSync(filepath).toString()
  const { texts } = html2texts(html)
  const localTexts = texts.map(({ text }) => {
    return { origin: text, local: '' }
  })

  fs.writeFileSync(outpath, JSON.stringify(localTexts, null, 2))
}
