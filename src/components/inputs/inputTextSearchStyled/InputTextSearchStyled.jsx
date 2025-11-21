import styleInput from './InputTextSearchStyled.module.css'
import SearchResultsList from './SearchResultList';
import { useState, useRef, useEffect } from 'react';
import BouncyLoading from '../../loaders/bouncyLoading/BouncyLoading'


const InputTextSearchStyled = ({typeInput="text", titleLabel="", nameLabel="", placeholderText="", size=true, onChange=null, onKey=null, value="", onSearch=null, setOneResult=null, results=[], combineNameFields=false }) => {

    const [theResults, setTheResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);


    // Detect clicks out side of component for close of list
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setTheResults([]);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const fetchData = async(oneValue)=>{
        if(oneValue.length>3){
            setIsLoading(true)
            const response= await onSearch(oneValue)
            setTheResults(response)
            setIsLoading(false);
        } else {
            setTheResults([])
        }
    }

    const handleChange = (e)=>{
        onChange(e.target.value);
        fetchData(e.target.value);
    };

    // handle result selection and hide the list
    const handleSelectResult = (selectedItem) => {
        if (combineNameFields) {
            const combined = [
                selectedItem.name,
                selectedItem?.surname,
                selectedItem?.brand
            ].filter(Boolean).join(' ');
            onChange(combined);
        }
        setOneResult(selectedItem);
        setTheResults([]);
    };


    return (
        <>
            <div ref={wrapperRef} className={`${styleInput.inputText_group} `}>
                
                <label className={`${styleInput.label}`}>{titleLabel}</label>
                
                <input 
                    autoComplete="off" 
                    name={nameLabel} 
                    className={`${styleInput.inputText} ${size?styleInput.sizeS:styleInput.sizeM} `} 
                    type={typeInput} 
                    placeholder={placeholderText} 
                    value={value} 
                    onChange={handleChange} 
                    onKeyDown={onKey}
                />
                
                {theResults.length>0&&(
                    <>
                    <SearchResultsList results={theResults} setOneResult={handleSelectResult} combineNameFields={combineNameFields}/> 
                    </>
                )}
                
                {
                    isLoading&&(
                        <>
                        <BouncyLoading/>
                        </>
                    )
                }
            </div>
        </>    
        
    );
};

export default InputTextSearchStyled;