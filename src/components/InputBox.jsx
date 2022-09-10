import React, { useState, useEffect } from "react";

import '../index.css'

const API_KEY = '462kpny2w6l0e2ekyl8tb7u2uf7gsv5ajspc28ak69kvjl0om';

async function checkIfValidWord( inputWord ) {
    if (inputWord === 'PATAGORGEOUS') return true;
    const url = `https://api.wordnik.com/v4/word.json/${inputWord}/frequency?useCanonical=false&startYear=2000&endYear=2012&api_key=${API_KEY}`;
    const response = await fetch(url);
    if (response.status === 404) return false;

    const data = await response.json();
    console.log(data);
    if (data.totalCount === 0) return false;
    return true;
}

async function checkIfValidInput( inputText, message, setErrorMessage ) {
    const inputtedWords = inputText.split(' ');
        const messageWords =  message.split(' ');
    if (inputtedWords.length > messageWords.length) {
        setErrorMessage('Too many words!');
        return false;
    }

    if (inputtedWords.length < messageWords.length) {
        setErrorMessage('Too few words!');
        return false;
    }

    for (let i = 0; i < inputtedWords.length; i += 1) {
        if (!/^[a-zA-Z]+$/.test(inputtedWords[i])) { 
            setErrorMessage(`${inputtedWords[i]} has an invalid character`);
            return false;
        }
        if (inputtedWords[i].length !== messageWords[i].length){
            setErrorMessage(`${inputtedWords[i]} is the wrong length`);
            return false;
        }
        const isWord = await checkIfValidWord(inputtedWords[i].toUpperCase());
        if (!isWord) {
            setErrorMessage(`${inputtedWords[i]} is not an recognized word`);
            return false;
        }
    }
    return true;
}

export function TextBox({ allLines, setAllLines, message }) {

    const [inputText, setInputText] = useState('');
    const [showInvalidMessage, setShowInvalidMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(inputText) {
        if (await checkIfValidInput(inputText, message, setErrorMessage)) {
            setAllLines([... allLines, inputText.toUpperCase()]);
            setShowInvalidMessage(false);
        }
        else {
            setShowInvalidMessage(true);
        }
        setInputText('');
    }

    function handleInput(e) {
        setInputText(e.target.value);
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key == 'Enter') {
                event.preventDefault();
                handleSubmit(inputText);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [inputText]);

    return (
        <div className="flex justify-center">
            <div>
                <input 
                    type="text" 
                    className='mt-6' 
                    size="70"
                    value={inputText} 
                    onChange={(e) => handleInput(e)} 
                    placeholder=" Make a guess!"
                />
                {showInvalidMessage && 
                    <div className= "bg-amber-100 text-center mt-1"> Invalid Input! {errorMessage}</div>}
            </div>
        </div>
    )
}

export default TextBox;