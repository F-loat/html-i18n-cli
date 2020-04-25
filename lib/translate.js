const fs = require('fs')
const path = require('path')
const fanyi = require('./utils/fanyi')

module.exports = (file) => {
  const filepath = path.join(process.cwd(), file)
  const texts = require(filepath)
  const total = texts.length

  const writeFile = (data) => {
    fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
      if (err) console.log(err)
      console.log('译文已更新')
    })
  }

  async function translation(index) {
    if (index <= texts.length) {
      const current = texts[index - 1]
      const { origin, local } = current

      if (local) {
        translation(index + 1)
        return
      }

      current.local = await fanyi(origin)

      setTimeout(() => translation(index + 1), 1000)

      console.log({ origin, local: current.local })
      console.log(`${index}/${total}`)
    } else {
      writeFile(texts)
    }

    if (!(index % 10)) writeFile(texts)
  }

  translation(1)
}
