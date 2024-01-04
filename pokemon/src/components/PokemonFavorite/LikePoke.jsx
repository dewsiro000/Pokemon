import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function LikePoke() {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike((check) => ! check)
  }

  return (
    <div onClick={toggleLike} className='flex justify-center p-4'>
       {like ? <FaHeart style={{ fontSize: '1.5em', color: 'red'}}/> :
        <FaRegHeart style={{fontSize: '1.5em'}}/>}
    </div>
  )
}

export default LikePoke
