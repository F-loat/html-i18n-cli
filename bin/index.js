#!/usr/bin/env node

const program = require('commander')

program
  .command('parse [htmlfile]')
  .description('解析 HTML 文件')
  .action(file => {
    require('../lib/parse')(file)
  })

program
  .command('render [htmlfile] [textsfile]')
  .description('生成 HTML 文件')
  .action((htmlfile, textsfile) => {
    require('../lib/render')(htmlfile, textsfile)
  })

program
  .command('translate [textsfile]')
  .description('翻译 JSON 文件')
  .action(file => {
    require('../lib/translate')(file)
  })

program
  .command('convert [file]')
  .description('转换 JSON/EXCEL 文件')
  .action(file => {
    require('../lib/convert')(file)
  })

program.parse(process.argv)
