import styled from './BouncyLoading.module.css';

function BouncyLoading() {
    return (
        <span className = {styled.loader}>
            <span className = {styled.loader__ball}></span>
            <span className = {styled.loader__ball}></span>
            <span className = {styled.loader__ball}></span>
        </span>
    )
}

export default BouncyLoading