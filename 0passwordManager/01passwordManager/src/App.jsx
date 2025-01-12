import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordGenerator = useCallback(() => {
    let str = "abcdefghigujklmnopqrstuvwxyz";
    let pass = "";

    if(numAllowed) str += "1234567890" ;
    if(charAllowed) str += "!@#$%^&*" ;

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * (str.length + 1));
      pass += str.charAt(char);
    }
    setPassword(pass);
    
  }, [length, numAllowed, charAllowed, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  } , [password]);
  useEffect(passwordGenerator, [length, numAllowed, charAllowed, setPassword, passwordGenerator]);

  const passwordref = useRef(null);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
        <h1 className='text-white text-center mb-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hideen mb-4'>
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          ref={passwordref}
          readOnly
          />
          <button onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
            setlength(e.target.value) 
            }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">  Numbers</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="charInput"> characters </label>
          </div>
          </div>
        </div>
    </>
  )
}

export default App
