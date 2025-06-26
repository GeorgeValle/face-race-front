import styled from './SearchResult.module.css';
import SearchResult from './SearchResult.jsx';


const SearchResultsList =({results,  setOneResult, typeName="name"}) => {
    //const entries = Object.entries(results);

    const handleChange = (value)=>{  
        setOneResult(value)
        //setOpenModal(true);
    }
    return (
        <>
        <article className={styled.results_list}>
    <div >
        {  
        results.map((result) =>{

            return  <SearchResult  result={result} onClicking={handleChange} typeName={typeName} key={result._id}/>
            })
        }
    </div>
    </article>
    </>
    );
};

export default SearchResultsList