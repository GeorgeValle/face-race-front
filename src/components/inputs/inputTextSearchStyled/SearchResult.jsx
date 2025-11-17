import Styled from './SearchResult.module.css';

const SearchResult = ({result, onClicking, typeName=3}) => {
    
    return (
    <>
        <div  className={Styled.search_result} onClick={()=> onClicking(result)}>
            {result[typeName]}
        </div>
    </>
    )
}

export default SearchResult