// This file handles the plug board

const plugs = [["Q", "H"], ["E", "N"], ["R", "M"], ["T", "L"], ["Y", "S"], ["U", "I"], ["O", "K"], ["P", "C"], ["D", "V"], ["F", "G"]]

const plugboardRunThrough = (character) => {
    if (plugs[character] != undefined) {
        return plugs[character][1]
    }else {
        return character
    }
}

// Convert plugboard into codes on startup
let track = 0
plugs.forEach(plugConfig => {
    let origPort = plugConfig[0]
    let newPort = plugConfig[1]
    origPort = characterTable.indexOf(origPort.charCodeAt(0))
    newPort = characterTable.indexOf(newPort.charCodeAt(0))
    plugs[track][0] = origPort
    plugs[track][1] = newPort
    track++
})
console.log(plugs)