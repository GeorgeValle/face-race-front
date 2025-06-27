import styleInput from './InputTextSearchStyled.module.css'
import SearchResultsList from './SearchResultList';
import { useState } from 'react';
import BouncyLoading from '../../loaders/bouncyLoading/BouncyLoading'


const InputTextSearchStyled = ({typeInput="text", titleLabel="", nameLabel="", placeholderText="", size=true, onChange=null, onKey=null, value="", onSearch=null, setOneResult=null, results=[] }) => {

    //const [input, setInput] = useState(value);
    const [theResults, setTheResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = async(oneValue)=>{
                
        if(oneValue.length>3){
        setIsLoading(true)
            // fetch(`https://wiki-ideas-back.fly.dev/topics/search/${value}`)
            // .then((response)=>response.json())
            // .then((json)=>{
            //     setTheResults(json.data)
            // }).catch((error) => {
            //     console.log (error)})
            // .finally( ()=>setIsLoading(false))
            //     }
            //     else{
            //         setTheResults([])
            //     }
            const response= await onSearch(oneValue)
            setTheResults(response)
            
            setIsLoading(false);
            console.log(theResults)
        }
    }

    const handleChange = (e)=>{
        //setInput(value);
        //onChange(value)
        onChange(e.target.value);
        fetchData(e.target.value);
    };


    return (
        <>
            <div className={`${styleInput.inputText_group} `}>
                
                    <label className={`${styleInput.label}`}>{titleLabel}</label>
                
                <input autoComplete="off" name={nameLabel} className={`${styleInput.inputText} ${size?styleInput.sizeS:styleInput.sizeM} `} type={typeInput} placeholder={placeholderText} value={value} onChange={handleChange} onKeyDown={onKey}/>
                {theResults.length>0&&(
                    <>
                    <SearchResultsList results={theResults} setOneResult={setOneResult}/> 
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