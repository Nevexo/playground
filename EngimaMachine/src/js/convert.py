# This tool converts the Wikipedia rotor configuration into JSON objects.
import json

code = input("Rotor Scramble Code: ")

chars = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25}

asciiCode = 0
forwards = []
for x in code:
    forwards.append(chars[x])
    asciiCode += 1

print(json.dumps(forwards))