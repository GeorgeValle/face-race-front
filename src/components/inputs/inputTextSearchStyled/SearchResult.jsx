import Styled from './SearchResult.module.css';

const SearchResult = ({result, onClicking, displayFields=["name"]}) => {
    const displayText = displayFields
        .map(field => result[field])
        .filter(Boolean)
        .join(' ');
    
    return (
    <>
        <div  className={Styled.search_result} onClick={() => onClicking(result)}>
            {displayText}
        </div>
    </>
    )
}

export default SearchResult