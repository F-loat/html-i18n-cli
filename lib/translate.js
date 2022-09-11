const fs = require('fs')
const path = require('path')
const fanyi = require('./utils/fanyi')
const file2texts = require('./utils/file2texts')

module.exports = (file, options) => {
  const filepath = path.join(process.cwd(), file)
  const texts = file2texts(filepath)
  const total = texts.length
  const transMap = new Map()

  const writeFile = (data) => {
    const texts = data.reduce((result, { local, origin }) => {
      return { ...result, [origin]: local }
    }, {})
    fs.writeFile(filepath, JSON.stringify(texts, null, 2), (err) => {
      if (err) console.log(err)
      console.log('译文已更新\n')
    })
  }

  async function translation (index) {
    if (index <= texts.length) {
      const current = texts[index - 1]
      const { origin, local } = current

      if (local) {
        transMap.set(origin, local)
        translation(index + 1)
        return
      }

      const hasLocal = transMap.get(origin)

      if (hasLocal) {
        current.local = hasLocal
        translation(index + 1)
      } else {
        current.local = await fanyi(origin, options.to, options.appid, options.secret)
        transMap.set(origin, current.local)
        setTimeout(() => translation(index + 1), 1000)
      }

      console.log(`${index}/${total} ${origin} -> ${current.local}\n`)
    } else {
      writeFile(texts)
    }

    const { number = 20 } = options
    if (!(index % number)) writeFile(texts)
  }

  translation(1)
}
