const fs = require('fs')
const path = require('path')

const pathResolve = (pathname) => { return path.resolve(__dirname, pathname) }

const htmlFileArr = ['index', 'about', 'contact']
let template = fs.readFileSync(pathResolve(`../src/template/template.html`), 'utf-8')
let commonHeader = fs.readFileSync(pathResolve(`../src/template/common-header.html`), 'utf-8')

// 公共头部

template = template.replace('<common-header></common-header>', commonHeader)

htmlFileArr.forEach((fileName, index) => {
    let content = template.replace(/{{pageName}}/, fileName)

    let count = -1
    content = content.replace(/{{active}}/g, () => {
        count++
        if (count === index) {
            return ' active'
        } else {
            return ''
        }
    })
    fs.writeFileSync(pathResolve(`../src/${fileName}.html`), content)
})
