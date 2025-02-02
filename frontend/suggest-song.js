

document.addEventListener("DOMContentLoaded", () => {
    checkTemplateSupport()

    const addLineButton = document.getElementById("add-line")
    addLineButton.addEventListener("click", addLine)
});

function addLine(){
    const brLinesDiv = document.getElementById("brazilian-lines");
    const template = document.getElementById("new-line");

    const clone = template.content.cloneNode(true);

    brLinesDiv.appendChild(clone);
}

function checkTemplateSupport(){
    if (("content" in document.createElement("template")) == false) {
        const errorMessagesDiv = document.getElementById("error-messages")
        errorMessagesDiv.textContent="Browser too old to support this functionality"
    }
}