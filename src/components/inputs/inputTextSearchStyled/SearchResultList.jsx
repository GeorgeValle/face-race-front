
import styled from './SearchResult.module.css';
import SearchResult from './SearchResult.jsx';


const SearchResultsList =({results,  setOneResult, displayFields=["name"]}) => {
    //const entries = Object.entries(results);
    
    const handleChange = (value) => {  
    // Serialize the value to avoid non-serializable errors in Redux
    const serializedValue = JSON.parse(JSON.stringify(value));
    setOneResult(serializedValue);
    //setOpenModal(true);
};
    return (
        <>
        <article className={styled.results_list}>
    <div >
        {  
        results.map((result) =>{
            
            return  <SearchResult  result={result} onClicking={handleChange} displayFields={displayFields} key={result._id}/>
            })
        }
    </div>
    </article>
    </>
    );
};

export default SearchResultsList