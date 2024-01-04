import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FavPoke from './FavPoke'
import ReactLoading from 'react-loading';


const Pokemon = () => {
  const [poke, setPoke] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [number, SetNumber] = useState(1);
  const [fav, setFav] = useState([]);
  
  
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async() => {
      try {
        setLoading(true);  
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });
        setPoke(response.data);
        setError('');
      } catch (error) {
        setError('Something went wrong!!', error)
      } finally {
        setLoading(false)
      }
    }
    loadPoke();
    return () => abortController.abort(); //cancel requesr เพื่อกันการเรียกซ้ำ
  }, [number])
  
  
  

  const prevPoke = () => {
      SetNumber((number) => number - 1)
  }

  const nextPoke = () => {
      SetNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, poke])  //ส่ง state ตัวเก่ามาเพื่อที่เราจะอัปเดตพร้อมกับstateตัวใหม่
  }

  console.log('Pokemon ID:', number);
  console.log('Your fav pokemon', fav);

  return (
    <div className='max-w-full p-6 bg-white border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-700'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
      {loading ? 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              {error ? (
                <div className='items-center flex justify-center pt-80 text-4xl text-bold text-red-500'>
                   Something went wrong! Please try again.
                </div>
              ) : (
              <>
                <ReactLoading type='spin' color='black' height={'20%'} width={'20%'} />
                <p className='pl-2 flex justify-center items-center font-extralight' style={{ caretColor: 'transparent' }}>is Loading...</p>
              </>
          )}
        </div> 
        : 
        <div  style={{caretColor: 'transparent' }}>
          <h1 className='flex justify-center text-4xl text-blod pb-4 capitalize '>{poke?.name}</h1>
          <div className='flex  justify-center  '>
           <button className='bg-pink-300 border-2 p-2 hover:bg-pink-200' onClick={addFav}>
            <p className='font-bold'>Add to favorite</p>
           </button>
          </div>
          <br/>
          <div className='flex justify-center'>
            <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name}/>
            <ul>
              {poke?.abillities?.map((abil, idx) => (
                <li key={idx}>{abil?.ability?.name}</li>
              ))}
            </ul>
          </div>
          <div className='flex justify-center'>
          <button className='bg-gray-300 border-2 p-2 hover:bg-gray-200 cursor-pointer' onClick={prevPoke}>Previous</button>
          <button className='bg-gray-300 border-2 p-2 hover:bg-gray-200 cursor-pointer' onClick={nextPoke}>Next</button>
          </div>
        </div>}
        <div className='border-2 border-black shadow-xl p-4 bg-gray-100'>
          <h2 className='flex justify-center font-serif text-xl text-purple-800 pb-7'>Your favorite pokemon</h2>
          {fav.length > 0 ? <FavPoke fav={fav}/> : <div className='flex h-full justify-center items-center'><p>No favorite pokemon...</p></div>}
        </div>
      </div>
    </div>
  )
}

export default Pokemon
