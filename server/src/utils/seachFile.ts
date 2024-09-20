export function getElementByNumber(filenames: String[], targetNumber: number) {
  console.log(filenames)
    for (const filename of filenames) {
      const match = filename.match(/(\d+)-facichat\.png/);
      console.log(match)
      if (match) {
        const number = parseInt(match[1]);
        if (number == targetNumber) {
          console.log(filename)
          return filename;
        }
      }
    }
  
    return null; // Devuelve null si no se encuentra ninguna coincidencia
  }