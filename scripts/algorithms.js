
// Will filter possible words based on grey, yellow and green letters
function getWords(tableID, words){

    let greyLetters = getLetters(tableID, GREY);
    let yellowLetters = getLetters(tableID, YELLOW);
    let greenLetters = getLetters(tableID, GREEN);

    // Adjusts grey and yellow letters
    checkForLetterOverlap(greyLetters, yellowLetters, greenLetters);
    
    let filteredWords = removeGreyLetters(words, greyLetters);
    filteredWords = includeYellowLetters(filteredWords, yellowLetters);
    filteredWords = includeGreenLetters(filteredWords, greenLetters);

    return filteredWords;
}

// If a letter is present twice in a word, but only only placement is correct the other letter turns grey. This messes with the otherwise "perfect" filtering algorithm
function checkForLetterOverlap(greyLetters, yellowLetters, greenLetters){
    for (const letter of greenLetters){
        if (yellowLetters.has(letter[0])){
            yellowLetters.delete(letter[0]);
        }
        if (greyLetters.has(letter[0])){
            greyLetters.delete(letter[0])
        }
    }
}

// Fetches letters from the table
function getLetters(tableID, color){
    let table = document.getElementById(tableID);
    let letters = [];

    const inputs = table.querySelectorAll("input");
    
    inputs.forEach((input) => {
        if (input.style.backgroundColor == color && input.value != ""){
            let cell = input.parentElement;
            let cellIndex = cell.cellIndex;
            letters.push([input.value, cellIndex]);
        }
    });
    
    
    letters = new Map(letters);

    return letters
}

function removeGreyLetters(words, letters) {
    if(letters.length == 0){
        return words;
    }

    let filteredWords = [];

    for (const word of words){
        let wordContainsLetters = false;

        for (const letter of letters){
            let [char, i] = letter;
            if (word.includes(char)){
                wordContainsLetters = true;
                break
            }
        }

        if(!wordContainsLetters){
            filteredWords.push(word);
        }

    }

    return filteredWords;
}

function includeYellowLetters(words, letters) {
    if(letters.length == 0){
        return words;
    }

    let filteredWords = [];
    for (const word of words){
        let wordContainsLetters = true;

        for (const letter of letters){
            let [char, i] = letter;
            if (!word.includes(char) || word[i] == char){
                wordContainsLetters = false;
                break;
            }
        }

        if(wordContainsLetters){
            filteredWords.push(word);
        }
    }

    return filteredWords;
}

function includeGreenLetters(words, letters) {

    if(letters.length == 0){
        return words;
    }
    
    let filteredWords = [];
    
    for (const word of words){
        let wordContainsLetters = true;
        for (const letter of letters){
            let [char, i] = letter;
            if(word[i] != char){
                wordContainsLetters = false;
                break;
            }
        }
        if (wordContainsLetters){
            filteredWords.push(word)
        }
    }
    return filteredWords;
}


