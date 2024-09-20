function msgText(text){
    const textArr = text.split("")
    let newText;
    if(textArr.length <= 40){
        return text
    }
    newText = textArr.slice(0, 41).join("")
    return newText + "..."
}

console.log(msgText("hola como estas como estan tus amigos de la ingancia"))