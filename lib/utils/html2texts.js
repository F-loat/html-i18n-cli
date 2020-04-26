const dayjs = require('dayjs')
const parser = require('posthtml-parser')

module.exports = html => {
  const texts = []
  const tree = parser(html)

  const transform = (node, paths = '') => {
    const isStyle = node.tag === 'style'
    const isScript = node.tag === 'script'
    if (isStyle || isScript) return

    const { placeholder } = node.attrs || {}
    const hasPlaceholder = !!placeholder
    if (hasPlaceholder) {
      transform(placeholder, `${paths}.attrs.placeholder`)
      return
    }

    const hasContent = !!node.content
    if (hasContent) {
      node.content.forEach((item, index) => {
        transform(item, `${paths}.content[${index}]`)
      })
      return
    }

    const isString = typeof node === 'string'
    if (!isString) return

    const text = node.replace(/\s+/g, ' ').trim()

    const isEmpty = !text
    if (isEmpty) return

    const isDOCTYPE = !!text.match(/<!DOCTYPE/)
    const isComment = !!text.match(/<!--/)
    if (isDOCTYPE || isComment) return

    const isDate = dayjs(text).isValid()
    const isDivider = text === '|'
    if (isDate || isDivider) return

    texts.push({ paths, text })
  }

  tree.forEach((item, index) => transform(item, `[${index}]`))

  return { tree, texts }
}
