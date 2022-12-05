function getWord(len) {
    let contenders = []

    for (let i = 0; i < wordList.length; ++i) {
        if (wordList[i].length == len) {
            contenders.push(wordList[i])
        }
    }

    let contender = contenders[Math.floor(Math.random()*contenders.length)]

    return contender
}