const fs = require('fs')
const path = require('path')
const html2texts = require('./utils/html2texts')

module.exports = (file) => {
  const filepath = path.join(process.cwd(), file)
  const outpath = filepath.replace('.html', '.json')
  const html = fs.readFileSync(filepath).toString()
  const { texts } = html2texts(html)
  const localTexts = texts.reduce((result, { text }) => {
    return { ...result, [text]: text }
  }, {})

  fs.writeFile(outpath, JSON.stringify(localTexts, null, 2), (err) => {
    if (err) console.log(err)
    console.log(`解析成功，已生成文件 ${outpath}`)
  })
}
