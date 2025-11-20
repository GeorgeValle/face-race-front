import styled from './SearchResult.module.css';
import SearchResult from './SearchResult.jsx';


const SearchResultsList =({results,  setOneResult, typeName="name", combineNameFields=false}) => {
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
            
            return  <SearchResult  result={result} onClicking={handleChange} typeName={typeName} combineNameFields={combineNameFields} key={result._id}/>
            })
        }
    </div>
    </article>
    </>
    );
};

export default SearchResultsList