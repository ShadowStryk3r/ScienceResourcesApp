const sass = require('sass');
const fs = require("fs")

const readDir = "./public/scss"
const writeDir = "./public/css"

function getFileName(file)
{
    return file.substring(0, file.indexOf("."))
}

function compileDir(dir)
{
    dir = dir || ""

    if (!fs.existsSync(writeDir+"/"+dir))
        fs.mkdirSync(writeDir+"/"+dir)

    fs.readdirSync(readDir+"/"+dir).map((file) => {
        if (file.includes("."))
        {
            try {
                const result = sass.compile(readDir+"/"+dir+"/"+file)
                fs.writeFileSync(writeDir+dir+"/"+getFileName(file)+".css", result.css)
            } catch {

            }
        } else {
            compileDir(dir+"/"+file)
        }
    })
}

compileDir()