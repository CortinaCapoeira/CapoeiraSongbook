function emptyTextObject() { 
    return { text: "", tooltip: undefined } 
}

function textObjectWith(textInput, tooltipInput) {
    const textObject = emptyTextObject()
    textObject.text = textInput
    textObject.tooltip = tooltipInput
    return textObject
}

function indexOfCapital(songLine, keyword){
    return songLine.toUpperCase().indexOf(keyword.toUpperCase())
}

function tooltipIdentification(songLine, details) {
    if (details == null) {
        details = []
    }

    const wholeLine = []

    const indexedDetails = details.map((detail) => ({
        key: detail.key,
        desc: detail.desc,
        indexStart: indexOfCapital(songLine, detail.key)
    }))

    const sortedDetails = indexedDetails
        .filter(detail => detail.indexStart >= 0)
        .sort((a, b) => a.indexStart - b.indexStart);

    let remainingSongLine = songLine

    for (const detail of sortedDetails) {

        const keyword = detail.key
        const description = detail.desc
        const keywordStartPosition = indexOfCapital(remainingSongLine, keyword)
        const keywordEndPosition = keywordStartPosition + keyword.length

        if (keywordStartPosition != 0) {
            const startNormalPart = remainingSongLine.slice(0, keywordStartPosition)
            const startNormalText = textObjectWith(startNormalPart)
            wholeLine.push(startNormalText)
        }

        const tooltipPart = remainingSongLine.slice(keywordStartPosition, keywordEndPosition)
        const tooltipText = textObjectWith(tooltipPart, description)
        wholeLine.push(tooltipText)

        remainingSongLine = remainingSongLine.slice(keywordEndPosition)

    }
    if (remainingSongLine.length > 0) {
        const endText = textObjectWith(remainingSongLine)
        wholeLine.push(endText)
    }

    return wholeLine
}


module.exports = {
    tooltipIdentification,
    emptyTextObject
}