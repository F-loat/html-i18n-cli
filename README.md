# html-i18n-cli

> HTML 国际化工具

## 安装

``` sh
npm i -g html-i18n-cli
```

## 使用

1. 生成 JSON 文件

``` sh
html parse test.html
```

2. 翻译 JSON 文件

> 输入两次 Ctrl + C 终止，机翻后可手动校对

``` sh
html translate test.json
```

  * -t zh 指定[目标语言](http://api.fanyi.baidu.com/doc/21)
  * -n 50 指定更新频率
  * --appid 百度翻译 APPID
  * --serret 百度翻译 SECRET

3. 还原 HTML 文件

``` sh
html render test.html test.json
```

## 附加功能

* JSON 转 EXCEL

``` sh
html convert test.json
```

* EXCEL 转 JSON

``` sh
html convert test.xlsx
```

## 相关项目

* [VSCode 插件](https://github.com/F-loat/vscode-plugin-html-i18n)

