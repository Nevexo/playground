// Extension features to make it nicer to type

const id = (id) => { return document.getElementById(id) }

const show_plugboard = () => {
    id("plugboard").hidden = false
    id("show_plugboard_button").hidden = true
}

const hide_plugboard = () => {
    id("plugboard").hidden = true
    id("show_plugboard_button").hidden = false
}