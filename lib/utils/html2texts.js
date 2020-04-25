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

    const isEmpty = !node.trim()
    if (isEmpty) return

    const isDOCTYPE = !!node.match(/<!DOCTYPE/)
    const isComment = !!node.match(/<!-- /)
    if (isDOCTYPE || isComment) return

    texts.push({
      paths,
      text: node.replace(/\s+/g, ' ').trim()
    })
  }

  tree.forEach((item, index) => transform(item, `[${index}]`))

  return { tree, texts}
}
