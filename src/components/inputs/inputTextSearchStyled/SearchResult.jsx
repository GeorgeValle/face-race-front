import Styled from './SearchResult.module.css';

const SearchResult = ({result, onClicking, typeName=3,combineNameFields=false}) => {
    
        const displayText = combineNameFields 
        ? [result.name, result?.surname, result?.brand].filter(Boolean).join(' ')
        : result[typeName];

    return (
    <>
        <div  className={Styled.search_result} onClick={()=> onClicking(result)}>
            {displayText}
        </div>
    </>
    )
}

export default SearchResult