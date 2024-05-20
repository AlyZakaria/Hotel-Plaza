import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'

function htmlTemplate(templatePath: any, replacement: any): any | never {
    try {
        const __dirname = path.resolve()
        const filePath = path.join(__dirname, `src/templates/${templatePath}`)
        const source = fs.readFileSync(filePath, 'utf-8').toString()
        const template = handlebars.compile(source)
        const replacements = replacement
        const htmlToSend = template(replacements)
        return htmlToSend
    } catch (err) {
        console.log(err)
        throw new Error('Failed to read template')
    }
}

export default htmlTemplate
