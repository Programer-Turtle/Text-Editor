let body = document.getElementById("body")
let text = document.getElementById("text")
document.getElementById("FontSize").value = 20
let iframe = document.getElementById("codeWindow")
text.innerHTML = "<span class='cursor'></span>"
let textlist = []
let styleList = []
let Codetext = ""
let cursorPosistionx = 0
let cursorPosistiony = 0

function logKey(key){
    let FontSize = document.getElementById("FontSize").value
    if(!(["Backspace", "Control", "Shift", "Tab", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].includes(key))){
        Charc = `${key}`
        Style = {'FontSize':FontSize}
        textlist.splice(cursorPosistionx, 0, Charc)
        styleList.splice(cursorPosistionx, 0, Style)
        cursorPosistionx++
    }
    else if(key == "Backspace"){
        if(!(cursorPosistionx==0)){
            textlist.splice(cursorPosistionx-1, 1)
            styleList.splice(cursorPosistionx-1, 1)
            cursorPosistionx--
        }
    }
    else if(key == "Tab"){
        Style = {'FontSize':FontSize}
        textlist.splice(cursorPosistionx, 0, "  ")
        styleList.splice(cursorPosistionx, 0, Style)
        cursorPosistionx++
    }
    else if(key == "Enter"){
        Style = {'FontSize':FontSize}
        textlist.splice(cursorPosistionx, 0, "\n")
        styleList.splice(cursorPosistionx, 0, Style)
        cursorPosistionx++
    }
    else if(key == "ArrowLeft"){
        if(!(cursorPosistionx==0)){
            cursorPosistionx--
        }
    }
    else if(key == "ArrowRight"){
        if(!(cursorPosistionx==textlist.length)){
            cursorPosistionx++
        }
    }
    textlist.splice(cursorPosistionx, 0, "<span class='cursor'></span>")
    styleList.splice(cursorPosistionx, 0, `{FontSize:${FontSize}px;}`)
    Codetext = ""
    for(let currentCharIndex = 0; currentCharIndex<textlist.length; currentCharIndex++){
        Codetext += `<span style="font-size:${styleList[currentCharIndex]["FontSize"]}px;">${textlist[currentCharIndex]}</span>`
    }
    textlist.splice(cursorPosistionx, 1)
    styleList.splice(cursorPosistionx, 1)
    let fixedCodeText = Codetext.replaceAll("\n", "<br>")
    text.innerHTML = fixedCodeText
}

function Save(){
    let DocumentName = document.getElementById("NameInput").value
    let SaveCodeText = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${DocumentName}</title><style>p{font-family: monospace;font-size: 20px;white-space:pre-wrap;}</style></head><body><p>${Codetext}</p></body></html>`
    let blob = new Blob([SaveCodeText.replaceAll("\n", "<br>")], { type: 'text/plain' })
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${DocumentName}.html`
    link.click()

    setTimeout(() => URL.revokeObjectURL(link.href), 100);
}

body.addEventListener("keydown", event => {
    logKey(event.key)
})
