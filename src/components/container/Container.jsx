import ContainerStyles from './Container.module.css'



const Container = ({ children}) => {
    

    return (
        <>
            <section className={ContainerStyles.box}>
                    {children}
            </section>
        </>  
        
    );
};

export default Container;