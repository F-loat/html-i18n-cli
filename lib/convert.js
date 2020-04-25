const fs = require('fs')
const path = require('path')
const json2xls = require('json2xls')
const xls2json = require('convert-excel-to-json')

module.exports = (file) => {
  const filepath = path.join(process.cwd(), file)
  const extname = path.extname(filepath)

  if (!['.xlsx', '.json'].includes(extname)) {
    console.log('文件格式错误')
    return
  }

  if (extname === '.xlsx') {
    const outpath = filepath.replace(extname, '.json')
    const json = xls2json({
      sourceFile: filepath,
      columnToKey: {
        A: 'origin',
        B: 'local'
      }
    })['Sheet 1']
    json.splice(0, 1)
    fs.writeFileSync(outpath, JSON.stringify(json, null, 2))
  }

  if (extname === '.json') {
    const outpath = filepath.replace(extname, '.xlsx')
    const json = require(filepath)
    const xlsx = json2xls(json)
    fs.writeFileSync(outpath, xlsx, 'binary')
  }

  console.log('转换成功')
}
