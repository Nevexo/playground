// Key control

const status = (message, colour) => {
    id("machine_status").innerText = message
    id("machine_status").style.color = colour
}

const light = (state, key) => {
    if (state == true) {
        // Light up the key
        id("key_" + key).style.background = "goldenrod"
    }else if (state == "red") {
        id("key_" + key).style.background = "red"
    }else {
        id("key_" + key).style.background = "grey"
    }
}

const backCovertKeyTable = (key) => {
    // This converts and ascii character back into the 0-25 alphabet.
    return characterTable.indexOf(key)
}

// Key Down

let keyPressed = 0;
let keysEnabled = true;
let engimaKey = 0;

window.onkeydown = function (e) {
    if (keysEnabled) {
        let key = e.keyCode ? e.keyCode : e.which;
        if (key <= 90 && key >= 65) {
            if (keyPressed == 0) {
                keyPressed = key
                engimaKey = check_character(plugboardRunThrough(backCovertKeyTable(keyPressed)))
                light(true, characterTable[engimaKey])
                status("Waiting for key up...", "goldenrod")
            }
        }else {
            status("Out of range key.", "red")
        }
    }
}

window.onkeyup = function (e) {
    if (keysEnabled) {
        let key = e.keyCode ? e.keyCode : e.which;
        if (key <= 90 && key >= 65) {
            if (key == keyPressed) {
                keyPressed = 0
                light(false, characterTable[engimaKey])
                status("ROTATING!", "red")
                keysEnabled = false;
                cycle_rotors()
                keysEnabled = true;
    
                status("Waiting for key press", "orange")
            }
        }else {
            status("Waiting for key press", "orange")
        }
    }
}

const findConbinations = () => {
    for (char=65;char < 91;char++) {
        for (i=0; i< 17577; i++) {
            let k = check_character(char)
            light(true, k)
            cycle_rotors()
        }
    }
}

const run = (string) => {
    let finalString = ""

    string.split("").forEach(char => {
        console.log(char.charCodeAt(0))
        finalString = finalString + String.fromCharCode(characterTable[check_character(plugboardRunThrough(backCovertKeyTable(char.charCodeAt(0))))])
        cycle_rotors()
    })
    console.log("----")
    console.log(finalString)
}