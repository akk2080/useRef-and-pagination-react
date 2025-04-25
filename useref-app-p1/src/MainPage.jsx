import { useEffect, useState, useRef } from "react";

function MainPage(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const myref = useRef();

    async function fetchData(){
        let res = await fetch('https://jsonplaceholder.typicode.com/todos');
        let currData = await res.json();

        setData(currData);
    }

    useEffect(()=>{
        fetchData();
    }, []);

    function handlePrev(){
        console.log(myref.current)
        if(currentPage%2 == 0)
            myref.current.style.backgroundColor = 'lightgreen'
        else
            myref.current.style.backgroundColor = 'yellow'
        setCurrentPage(prev => prev - 1);
    }

    function handleNext(){
        if(currentPage%2 == 0)
            myref.current.style.backgroundColor = 'lightgreen'
        else
            myref.current.style.backgroundColor = 'yellow'
        setCurrentPage(prev => prev + 1)
    }


    let lastIndex = currentPage*10;
    let firstIndex = lastIndex - 10;

    return (
        <>
            <button onClick={handlePrev} disabled = {currentPage==1}>prev</button><span ref={myref}>{currentPage}</span><button onClick={handleNext} disabled={currentPage >= (data.length/10)}>next</button>
            <div className="todoList">
            {data.slice(firstIndex, lastIndex).map((d, index) => {
                return(
                    <div className='card' key={index}>
                        <h4>title: {d.title}</h4>
                        <h5>status: {d.complete ? 'completed' : 'pending'}</h5>
                    </div>

                )
            })}
            </div>  
        </>
    )
}

export default MainPage