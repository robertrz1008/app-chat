function msgText(text: string, isMyMsg: boolean): string{
    const textArr = text.split("")
    let newText;
    if(textArr.length > 30 && !isMyMsg){
        newText = textArr.slice(0, 31).join("")
        return newText + "...";
    }else if(textArr.length > 27 && isMyMsg){
        newText = textArr.slice(0, 28).join("")
        return newText + "...";
    }
    return text
}

export default msgText