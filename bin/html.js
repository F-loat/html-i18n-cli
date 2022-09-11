#!/usr/bin/env node

const program = require('commander')

program
  .command('parse [htmlfile]')
  .description('解析 HTML 文件')
  .action(file => {
    require('../lib/parse')(file)
  })

program
  .command('render [htmlfile] [jsonfile]')
  .description('生成 HTML 文件')
  .action((htmlfile, jsonfile) => {
    require('../lib/render')(htmlfile, jsonfile)
  })

program
  .command('translate [jsonfile]')
  .option('-t, --to', '目标语言', 'zh')
  .option('-n, --number', '每 n 条数据保存一次', 20)
  .option('-a, --appid', '百度翻译 APPID', '20200424000428633')
  .option('-s, --secret', '百度翻译 SECRET', 'ptBeUtXqXC0WE4vQUWcx')
  .description('翻译 JSON 文件')
  .action((file, options) => {
    require('../lib/translate')(file, options)
  })

program
  .command('convert [file]')
  .description('转换 JSON/EXCEL 文件')
  .action(file => {
    require('../lib/convert')(file)
  })

try {
  program.parse(process.argv)
} catch (err) {
  console.log(err.message)
}
