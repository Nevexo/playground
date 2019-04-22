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
let tracker = 0
plugs.forEach(plugConfig => {
    let origPort = plugConfig[0]
    let newPort = plugConfig[1]
    origPort = characterTable.indexOf(origPort.charCodeAt(0))
    newPort = characterTable.indexOf(newPort.charCodeAt(0))
    plugs[tracker][0] = origPort
    plugs[tracker][1] = newPort
    tracker++
})
console.log(plugs)