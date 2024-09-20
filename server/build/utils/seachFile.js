"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementByNumber = void 0;
function getElementByNumber(filenames, targetNumber) {
    for (const filename of filenames) {
        const match = filename.match(/(\d+)-facichat\.png/);
        if (match) {
            const number = parseInt(match[1]);
            if (number == targetNumber) {
                return filename;
            }
        }
    }
    return null; // Devuelve null si no se encuentra ninguna coincidencia
}
exports.getElementByNumber = getElementByNumber;
