import React from "react";

import '../index.css'

function Letter({char, color}) {
    return (
        (char === ' ') ? <div className= "bg-slate-600 w-6 h-6 mr-2"/> :
        <div className= {`text-center font-bold text-white ${color} w-6 h-6 mr-2`}> {char} </div>
    )
}

function getColors (line, message) {
    const letterArray = line.split('');
    let copy = message.slice();
    const result = Array(letterArray.length).fill('blank');
    for (let i = 0; i < result.length; i += 1) {
        if (line[i] === message[i]) {
            copy = `${copy.slice(0, i)} ${copy.slice(i + 1)}`;
            result[i] = {char: line[i] , color: 'bg-green-500'};
        }
    }
    for (let i = 0; i < result.length; i += 1) {
        if (result[i] === 'blank') {
            const foundIndex = copy.indexOf(line[i]);
            if (foundIndex > -1) {
                copy = `${copy.slice(0, foundIndex)} ${copy.slice(foundIndex + 1)}`;
                result[i] = {char: line[i], color: 'bg-yellow-400'};
            } else {
                result[i] = {char: line[i], color: 'bg-slate-400'};
            }
        }
    }
    return result;
}

function Line({line, message, setStillPlaying}) {
    if (line === message) {
        setStillPlaying(false);
    }
    const colorDict = getColors(line, message);
    return (
        <div className="mt-4 mr-4 flex justify-center">
            {colorDict.map((e) => <Letter char={e.char} color={e.color}/>)}
        </div>
    )
}

export function Grid( {allLines, message, setStillPlaying}) {
    return (
        <div>
            {allLines.map((line) => 
                <Line line={line} message={message} setStillPlaying ={setStillPlaying}/>
            )}
        </div>
    )
}

export default Grid;