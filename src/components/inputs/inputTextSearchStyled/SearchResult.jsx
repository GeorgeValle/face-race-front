import Styled from './searchResult.module.css';

const SearchResult = ({result, onClicking, typeName="name"}) => {
    
    return (
    <>
        <div  className={Styled.search_result} onClick={()=> onClicking(result)}>
            {`result.${typeName}`}
        </div>
    </>
    )
}

export default SearchResult