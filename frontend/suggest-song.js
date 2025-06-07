
document.addEventListener("DOMContentLoaded", () => {
    checkTemplateSupport()

    onEvent(SELECT.addLine(), 'click', addLine)

    onEvent(SELECT.form(), "submit", send)

    onEvent(SELECT.changeLang(), "click", swapLanguages)

    addLine() // First line
});

// TODO extract to global parameter?
const songbookContributorUrl = 'https://api.capoeriasongbookcontributor.cc'

function send(e){
    e.preventDefault();

    const brLinesEl = Array.from(SELECT.brLines().children)
    const enLinesEl = Array.from(SELECT.enLines().children)
    const data = {
        title: getFormValue("title"),
        lines: brLinesEl.map((lineEl, idx) => ({
            br: getFormValueIn(lineEl, 'brline'),
            en: getFormValueIn(enLinesEl[idx], 'enline'),
            bold: getFormValueIn(lineEl, 'chorus')
        })),
        // TODO add author
        // dryRun: true, // Used for development... will be removed in final version
    }
    // console.log(data)
    // TODO fix styling for 2 types of translation

    // TODO validation!!!
    sendNewSong(data)
}

function addLine(){
    const newBrLine = SELECT.newBrLineTemplate().content.cloneNode(true)
    const newEnLine = SELECT.newEnLineTemplate().content.cloneNode(true)

    SELECT.brLines().appendChild(newBrLine);
    SELECT.enLines().appendChild(newEnLine);
}

function swapLanguages(){
    SELECT.brLines().classList.toggle('hide')
    SELECT.enLines().classList.toggle('hide')
}

const sendNewSong = (data) => {
    SELECT.message().textContent="Sending..." // TODO change it to a kind of spinner
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
        SELECT.message().textContent=""
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

const getElOf = (parent, selector) => parent.querySelector(selector)
// const getElsOf = (parent, selector) => parent.querySelectorAll(selector)

const getEl = (selector) => getElOf(document,selector)
// const getEls = (selector) => getElsOf(document,selector)

const getFormElements = (name) => Array.from(SELECT.form().querySelectorAll(`[name="${name}"]`))
const getFormElementIn = (parent, name) => parent.querySelector(`[name="${name}"]`)

const getElValue = (el) => el.type === 'checkbox'? el.checked : el.value
const getFormValue = (name) => getElValue(getFormElements(name)[0])
const getFormValueIn = (parent, name) => getElValue(getFormElementIn(parent, name))

const SELECT = [
    {id: "error-messages",              name: 'error'},
    {id: "success-messages",            name: 'message'},
    {id: "new-line-br",                 name: "newBrLineTemplate"},
    {id: "new-line-en",                 name: "newEnLineTemplate"},
    {id: "brazilian-lines",             name: "brLines"},
    {id: "english-lines",               name: "enLines"},
    {id: "add-line",                    name: "addLine"},
    {id: "send",                        name: "send"},
    {id: "swap-language",               name: "changeLang"},
    {selector: ".suggest-song form",    name: "form"}
].reduce((selectObj, elConfig) => {
    selectObj[elConfig.name] = elConfig.id?
        getElId.bind(null, elConfig.id) :
        getEl.bind(null, elConfig.selector)
    return selectObj
}, {})

const onEvent = (el, ev, func) => el.addEventListener(ev, func)
