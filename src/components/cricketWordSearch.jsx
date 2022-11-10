import React, { useState, useEffect } from 'react'
import Grid from './Grid'
const ALPHABATES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', '0', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const COLS = 12
const ROWS = 12;
const CricketWordSearch = () => {

    const [dataStore, setDataStore] = useState([])
    const [word, setWord] = useState(null)
    const [highlightedData, setHighlightedData] = useState([])
    const [count, setCount] = useState(0);
    const [showError,setShowError]  = useState(false)

    const GenerateRandomdata = () => {
        const data = []
        for (let row = 1; row <= ROWS; row++) {
            let rdata = [];
            for (let col = 1; col <= COLS; col++) {
                rdata.push(ALPHABATES[Math.floor(Math.random() * ALPHABATES.length)])
            }
            data.push(rdata);
        }
        setHighlightedData(data)
        setDataStore(data)
    }

    useEffect(() => {
        GenerateRandomdata()
    }, [])

    const leftToRightSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = 0;
        let row = 0;
        while (row < ROWS) {
            while (col < COLS) {
                if (word.length > iterator) {
                    if (data[row][col] === word[iterator]) {
                        index.push({ row: row, col: col })
                    } else {
                        index = [];
                        col++;
                        break;
                    }
                }
                col++;
                iterator++;
            }
            if (col > COLS - 1) {
                row++;
                col = 0;
            }
            iterator = 0
            if (index.length === word.length || row === ROWS)
                return index;

        }
        return index;

    }

    const rightToleftSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = COLS - 1;
        let row = 0;
        while (row < ROWS) {
            while (col >= 0) {
                if (word.length > iterator) {
                    if (data[row][col] === word[iterator]) {
                        index.push({ row: row, col: col })
                    } else {
                        index = [];
                        col--;
                        break;
                    }
                }
                col--;
                iterator++;
            }
            if (col <= 0) {
                row++;
                col = COLS;
            }
            iterator = 0
            if (index.length === word.length || row === ROWS)
                return index;

        }
    }

    const lowerDiagonalSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = 0;
        let row = 0;
        let tempRow = 0;
        while (row < ROWS) {
            tempRow = row
            while (col < COLS && tempRow < ROWS) {
                if (word.length > iterator) {
                    if (data[tempRow][col] === word[iterator]) {
                        index.push({ row: tempRow, col: col })
                        if (index.length === word.length)
                            return index;
                    } else {
                        index = [];
                        col++;
                        tempRow++;
                        break;
                    }
                }
                col++;
                tempRow++;
                iterator++;
            }
            if (col > COLS - 1) {
                row++;
                col = 0;
            }
            iterator = 0
            if (index.length === word.length || row === ROWS)
                return index;

        }
    }

    const upperDiagonalSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = COLS - 1;
        let row = ROWS - 1;
        let tempRow = 0;
        while (row >= 0) {
            tempRow = row
            while (col >= 0) {
                if (word.length > iterator) {
                    if (data[tempRow][col] === word[iterator]) {
                        index.push({ row: tempRow, col: col })
                        if (index.length === word.length)
                            return index;
                    } else {
                        index = [];
                        col--;
                        tempRow--;
                        break;
                    }
                }
                col--;
                tempRow--;
                iterator++;
            }
            if (col <= 0) {
                row--;
                col = COLS - 1;
            }
            iterator = 0
            if (index.length === word.length || row === 0)
                return index;

        }
    }

    const topToBottomSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = 0;
        let row = 0;
        while (col < ROWS) {
            while (row < COLS) {
                if (word.length > iterator) {
                    if (data[row][col] === word[iterator]) {
                        index.push({ row: row, col: col })
                    } else {
                        index = [];
                        row++;
                        break;
                    }
                }
                row++;
                iterator++;
            }
            if (row > ROWS - 1) {
                col++;
                row = 0;
            }
            iterator = 0
            if (index.length === word.length || col === COLS)
                return index;

        }
    }
    const bottomToTopSearch = (data) => {
        let index = [];
        let iterator = 0;
        let col = COLS - 1;
        let row = ROWS - 1;
        while (col >= 0) {
            while (row >= 0) {
                if (word.length > iterator) {
                    if (data[row][col] === word[iterator]) {
                        index.push({ row: row, col: col })
                    } else {
                        index = [];
                        row--;
                        break;
                    }
                }
                row--;
                iterator++;
            }
            if (row <= 0) {
                col--;
                row = 0;
            }
            iterator = 0
            if (index.length === word.length || col === 0)
                return index;

        }
    }

    const highlightSelectedWord = (indexs) => {
        let container = [...highlightedData];
        for (let i = 0; i < indexs.length; i++) {
            for (let j = 0; j < indexs[i].length; j++) {
                container[indexs[i][j].row][indexs[i][j].col] += '*'
            }
        }
        return container;
    }
    const removeAllstar = () => {
        let container = [...highlightedData];
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                container[i][j] = container[i][j].replaceAll('*', '');
            }
        }
    }

    const searchCricketWord = () => {
        setHighlightedData([])
        // for at a time one search  if you un comment this changes then we can search one word at time
        // removeAllstar(highlightedData)

        if ((dataStore && dataStore.length) && (word && word.length)) {
            let lefToRight = leftToRightSearch(dataStore) || []
            let topToBottm = topToBottomSearch(dataStore) || []
            let rightToLeft = rightToleftSearch(dataStore) || []
            let bottomToTop = bottomToTopSearch(dataStore) || []
            let lowerDiagonal = lowerDiagonalSearch(dataStore) || []
            let upperDiagonal = upperDiagonalSearch(dataStore) || []
            let indexs = [];
            if (word.length === lefToRight.length)
                indexs.push(lefToRight);
            if (word.length === rightToLeft.length)
                indexs.push(rightToLeft)
            if (word.length === topToBottm.length)
                indexs.push(topToBottm);
            if (word.length === bottomToTop.length)
                indexs.push(bottomToTop);
            if (word.length === lowerDiagonal.length)
                indexs.push(lowerDiagonal)
            if (word.length === upperDiagonal.length)
                indexs.push(upperDiagonal);
            setHighlightedData(highlightSelectedWord(indexs))
            setCount(count + 1)
            if(word.length >indexs.length){ 
                setShowError(true)
                setTimeout(()=>{
                 setShowError(false)
                },[3000])
            }
        } 
    }
    return (
        <div className='border-2 border-solid p-5'>
            <div className='flex justify-center items-center space-x-10'>
                <input type="text" className='border-2 p-2 w-[400px]' onChange={(e) => setWord(e.target.value.toUpperCase())} />
                <button className='btn btn-lg border-2 bg-green-500 text-white font-semibold py-2 px-3 rounded-lg' onClick={searchCricketWord}>Submit</button>
                <button className='btn btn-lg border-2 bg-amber-700 text-white font-semibold py-2 px-3 rounded-lg' onClick={GenerateRandomdata}>Generate New</button>
            </div>
            <div className='border-2 mt-5 p-4 text-center'>
              {showError &&   <p className='font-semibold  bg-red-400 p-2 inline my-4 '>Given word doesn`t exist</p> }
                <Grid data={highlightedData} />
            </div>
        </div>
    )
}

export default CricketWordSearch