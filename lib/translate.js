const fs = require('fs')
const path = require('path')
const fanyi = require('./utils/fanyi')

module.exports = (file, options) => {
  const filepath = path.join(process.cwd(), file)
  const texts = require(filepath)
  const total = texts.length
  const transMap = new Map()

  const writeFile = (data) => {
    fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
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
        current.local = await fanyi(origin, options.to)
        transMap.set(origin, current.local)
        setTimeout(() => translation(index + 1), 1000)
      }

      console.log(`${index}/${total} ${origin} -> ${current.local}\n`)
    } else {
      writeFile(texts)
    }

    const { number } = options
    if (!(index % number)) writeFile(texts)
  }

  translation(1)
}
