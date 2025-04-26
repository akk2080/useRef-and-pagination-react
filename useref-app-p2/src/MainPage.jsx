import { useEffect, useState, useRef } from "react";

function MainPage(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const myref = useRef();
    const totalCount = useRef();
    const totalPages = useRef();
    const apiPage = useRef();

    async function fetchData(){
        let res = await fetch('https://rickandmortyapi.com/api/character');
        let currData = await res.json();
        totalCount.current = currData.info.count;
        totalPages.current = currData.info.pages;
        apiPage.current = 1;
        setData(currData.results);
    }

    useEffect(()=>{
        fetchData();
    }, []);

    function handlePrev(){
        if(currentPage%2 == 0)
            myref.current.style.backgroundColor = 'lightgreen'
        else
            myref.current.style.backgroundColor = 'yellow'
        setCurrentPage(prev => prev - 1);
    }

    async function handleNext(){
        if(currentPage%2 == 0)
            myref.current.style.backgroundColor = 'lightgreen'
        else
            myref.current.style.backgroundColor = 'yellow'
        
        if((currentPage+1)*10 > data.length){
            apiPage.current++;
            let res = await fetch(`https://rickandmortyapi.com/api/character?page=${apiPage.current}`);
            let currData = await res.json();
            setData(prevData => [...prevData, ...currData.results]);
            setCurrentPage(prev => prev + 1);
        }
        else
            setCurrentPage(prev => prev + 1);
    }


    let lastIndex = currentPage*10;
    let firstIndex = lastIndex - 10;

    return (
        <>
            <button onClick={handlePrev} disabled = {currentPage==1}>prev</button><span ref={myref}>{currentPage}</span><button onClick={handleNext} disabled={currentPage >= (totalCount/10)}>next</button>
            <div className="grid">
            {data.slice(firstIndex, lastIndex).map((d, index) => {
                return(
                    <div className='card' key={index}>
                        <img src={d.image}/>   
                        <h3>{d.name}</h3>
                        <p>Species: {d.species}</p>
                        <p>Status: {d.status}</p>
                    </div>

                )
            })}
            </div>  
        </>
    )
}

export default MainPage