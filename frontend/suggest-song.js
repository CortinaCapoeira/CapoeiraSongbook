
document.addEventListener("DOMContentLoaded", () => {
    checkTemplateSupport()

    onEvent(SELECT.addLine(), 'click', addLine)

    onEvent(SELECT.form(), "submit", send)

    addLine() // First line
});

// TODO extract to global parameter?
const songbookContributorUrl = 'https://api.capoeriasongbookcontributor.cc'

function send(e){
    e.preventDefault();

    const data = {
        title: getFormValue("title"),
        lines: getFormElements("line").map(lineEl => ({ br: lineEl.value, en: "" }))
        //bold: 'bold' in lineEl.dataset (to access actual value ois lineEl.dataset.bold, but I don't think we need it)
    }
    console.log(data)
    // TODO validation!!!
    sendNewSong(data)
}

function addLine(){
    const brLinesDiv = SELECT.brLines()
    const template = SELECT.newLineTemplate()

    const clone = template.content.cloneNode(true);

    brLinesDiv.appendChild(clone);
}

const sendNewSong = (data) => {
    fetch(`${songbookContributorUrl}/song`, {
        method: "POST",
        body: JSON.stringify(data)
    }).then(resp => {
        if (!resp.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        // TODO perhaps redirect, or maybe clean form
        SELECT.message().textContent="Song successfully submitted"
    }).catch(e => {
        console.log(e)
        SELECT.error().textContent = "Error while submitting the song"
    }).finally(()=>{
        // TODO remove any spinner that might have been running
    });
}


function checkTemplateSupport(){
    if (("content" in document.createElement("template")) == false) {
        const errorMessagesDiv = SELECT.error()
        errorMessagesDiv.textContent="Browser too old to support this functionality"
    }
}

// ---- Helper functions ----

const getElId = (id) => document.getElementById(id)

const getEl = (selector) => document.querySelector(selector)

const getFormElements = (name) => Array.from(SELECT.form().querySelectorAll(`[name="${name}"]`))

const getFormValue = (name) => getFormElements(name)[0].value

const SELECT = [
    {id: "error-messages",              name: 'error'},
    {id: "success-messages",            name: 'message'},
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
