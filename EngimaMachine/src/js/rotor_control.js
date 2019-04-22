// Control for the rotors

let rotor_positions = {
    1: {
        "previous": 24,
        "current": 25,
        "next": 0
    },
    2: {
        "previous": 24,
        "current": 25,
        "next": 0
    },
    3: {
        "previous": 24,
        "current": 25,
        "next": 0
    }
}

const rotor_cycle = (rotor_id) => {
    // Cycle forward the selected rotor

    const current = rotor_positions[rotor_id]["current"]
    const next = rotor_positions[rotor_id]["next"]

    let newPrevious, newCurrent, newNext = 0;
    newCurrent = next
    newNext = (newCurrent + 1) % 26
    newPrevious = current

    rotor_positions[rotor_id] = {
        "previous": newPrevious,
        "current": newCurrent,
        "next": newNext
    }

    console.log(`Cycle ${rotor_id} from ${current} to ${newCurrent}`)

    // Redraw rotor
    id(`rotor_${rotor_id}_previous`).innerText = String.fromCharCode(characterTable[newPrevious]) + ` (${newPrevious})`
    id(`rotor_${rotor_id}_current`).innerText = String.fromCharCode(characterTable[newCurrent]) + ` (${newCurrent})`
    id(`rotor_${rotor_id}_next`).innerText = String.fromCharCode(characterTable[newNext]) + ` (${newNext})`
}

cycle_rotors = () => {
    rotor_cycle(1)
    if (rotor_positions[1]["current"] == 25) {
        // Rotor 1 has made a full rotation, move rotor 2
        rotor_cycle(2)
        if (rotor_positions[2]["current"] == 25) {
            // Rotor 2 has made a full rotation, move rotor 3
            rotor_cycle(3)
        }
    }
}

check_character_rotor = (character, rotor, direction) => {
    // This function will find out which character the rotor in its current position will switch to
    if (direction == "r") {
        // Reflect the signal
        return reflector[character]
    }else {
        rotor_current_pos = rotor_positions[rotor]["current"]
        key = (rotor_current_pos + character) % 25
    
        if (direction == "f") {
            return rotors[rotor][key]
        }else {
            let loc = rotors[rotor].indexOf(key)
            if (loc < 0) {
                loc = 26+loc
            }
            return loc
        }
    }
}
let previous = ""

check_character = (character) => {
    console.log(character)
    
    // Run a character through the rotors
    let rPositions = {"stage_1": {}, "stage_2": {}}
    // -------[Stage 1]-------
    // ROTOR 1
    rPositions["stage_1"]["rotor_1"] = check_character_rotor(character, 1, "f")
    rPositions["stage_1"]["rotor_2"] = check_character_rotor(rPositions["stage_1"]["rotor_1"], 2, "f")
    rPositions["stage_1"]["rotor_3"] = check_character_rotor(rPositions["stage_1"]["rotor_2"], 2, "f")
    // -------[Stage 2]-------
    rPositions["stage_1"]["reflected"] = check_character_rotor(rPositions["stage_1"]["rotor_3"], 2, "r")
    // -------[Stage 3]-------
    rPositions["stage_2"]["rotor_3"] = check_character_rotor(rPositions["stage_1"]["reflected"], 3, "b")
    rPositions["stage_2"]["rotor_2"] = check_character_rotor(rPositions["stage_2"]["rotor_3"], 3, "b")
    rPositions["stage_2"]["rotor_1"] = check_character_rotor(rPositions["stage_2"]["rotor_2"], 3, "b")
    // Final
    console.log(rPositions)
    return plugboardRunThrough(rPositions["stage_2"]["rotor_1"])

}

rotor_cycle(1)
rotor_cycle(2)
rotor_cycle(3)
