import React from 'react'

const Grid = (props) => {
    const { data } = props
    // console.log(data)
    return (
        <div className='m-2 '>
            {data.map((rows, index) => {
                return <div key={index} className="flex flex-row justify-center items-center" >
                    {rows.map((letter, lIndex) => {
                        return <div key={lIndex} className={ `${letter.indexOf('*')>=0?' flex justify-center my-[2px] m-[2px] items-center w-[62px] h-[62px] border-2 bg-green-400':'flex justify-center my-[2px] m-[2px] items-center w-[62px] h-[62px] border-2'}`}>
                            <p className="flex self-center mb-2 font-bold text-3xl" >{letter.indexOf('*')?letter.replaceAll('*',''):letter}</p>
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

export default Grid