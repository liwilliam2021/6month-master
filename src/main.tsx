import React, { FC, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Grid } from './components/WordGrid.jsx'
import { TextBox } from './components/InputBox.jsx'
import CutePhoto from './CutePhoto.png'

import './index.css'

//Uppercase, only contains letters and spaces
const MESSAGE = 'HAPPY SIX MONTHS PATAGORGEOUS'

function BlankGuess() {
  return (
    <div className="flex justify-center">
      {MESSAGE.split('').map((char) => (char === ' ') 
        ? <div className= "bg-slate-600 w-6 h-6 mr-2"/> : <div className= "bg-slate-400 w-6 h-6 mr-2"/>
      )}
      <div className='text-slate-600'>hh</div>
    </div>
  )
}

const App = document.getElementById('root')
const Root: FC = () => {
  const [allLines, setAllLines] = useState([]);
  const [stillPlaying, setStillPlaying] = useState(true);
  return (
    <div className="absolute h-full w-full bg-slate-600 flex justify-center">
      <div>
        <div className="text-3xl p-4 text-white flex justify-center">Bell-ordle</div>
        <BlankGuess/>
        <Grid allLines={allLines} message={MESSAGE} setStillPlaying={setStillPlaying}/>
        {stillPlaying ? 
          <div>
            <TextBox allLines={allLines} setAllLines={setAllLines} message={MESSAGE}/> 
            {allLines.length > 1 &&
            <div className='flex justify-center text-center mt-3 text-white'> 
              <span className='underline'>Hint:</span> &nbsp;I may have made up one word! 🥰 
            </div>}
            {allLines.length > 4 &&
            <div className='flex justify-center text-center mt-3 text-white'> 
              You Pata-got-this! 😈
            </div>}
          </div>:
          <div className='flex justify-center mt-6'>
            <div>
              <img src={CutePhoto} alt="cute photo :P" width={400}/>
              <div className='mt-4 text-white text-center font-bold'>
                Looks like we made it. Look how far we've come my baby ❤️
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

createRoot(App!).render(<Root />)
