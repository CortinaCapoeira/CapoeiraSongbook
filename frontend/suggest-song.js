
document.addEventListener("DOMContentLoaded", () => {
    checkTemplateSupport()

    onEvent(SELECT.addLine(), 'click', addLine)

    onEvent(SELECT.form(), "submit", send)
});

// TODO extract to global parameter?
const songbookContributorUrl = 'https://api.capoeriasongbookcontributor.cc'

function send(e){
    e.preventDefault();

    const data = {
        title: getFormValue("title"),
        lines: getFormElements("line").map(lineEl => ({br: lineEl.value}))
        //bold: 'bold' in lineEl.dataset (to access actual value ois lineEl.dataset.bold, but I don't think we need it)
    }
    console.log(data)
    // TODO validation!!!
    // TODO fix CORS error
    sendNewSong(data)

    // Other ways...
    // const form = SELECT.form()
    // const formData = new FormData(form)
    // const data = {
    //     title: formData.get("title"),
    //     lines: formData.getAll("line").map(l => ({br: l}))
    // }

    // const data = {}
    // for (const key of formData.keys()) {
    //     console.log(key)
    //     console.log()
    //     const valArray = formData.getAll(key)
    //     const val = valArray
    //     data[key] =
    // }


    // const titleEl = document.getElementById("title");
    // const title = titleData(titleEl)

    // const brLinesDiv = document.getElementById("brazilian-lines");
    // const lineElements = brLinesDiv.querySelectorAll('input')
    // const lines = lineElements.map(lineData)

}

function addLine(){
    const brLinesDiv = SELECT.brLines()
    const template = SELECT.newLineTemplate()

    const clone = template.content.cloneNode(true);

    brLinesDiv.appendChild(clone);
}

function checkTemplateSupport(){
    if (("content" in document.createElement("template")) == false) {
        const errorMessagesDiv = SELECT.error()
        errorMessagesDiv.textContent="Browser too old to support this functionality"
    }
}

const getElId = (id) => document.getElementById(id)

const getEl = (selector) => document.querySelector(selector)

const getFormElements = (name) => Array.from(SELECT.form().querySelectorAll(`[name="${name}"]`))

const getFormValue = (name) => getFormElements(name)[0].value

const SELECT = [
    {id: "error-messages",              name: 'error'},
    {id: "new-line",                    name: "newLineTemplate"},
    {id: "brazilian-lines",             name: "brLines"},
    {id: "add-line",                    name: "addLine"},
    {id: "send",                        name: "send"},
    {selector: ".suggest-song form",    name: "form"}
].reduce((selectObj, elConfig) => {
    selectObj[elConfig.name] = elConfig.id?
        getElId.bind(null, elConfig.id) :
        getEl.bind(null, elConfig.selector)
    return selectObj
}, {})

const onEvent = (el, ev, func) => el.addEventListener(ev, func)

const onElEvent = (elementId, ev, func) => onEvent(getElId(elementId), ev, func)

const sendNewSong = (data) => {
    fetch(`${songbookContributorUrl}/song`, {
        method: "POST",
        body: data
    });
}