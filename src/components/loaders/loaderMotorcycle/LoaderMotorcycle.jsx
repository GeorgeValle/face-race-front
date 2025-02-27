import imageMotorcycle from './logo_motorcycle.png';
import style from './LoaderMotorcycle.module.css'; 

const LoaderMotorcycle = () => {
    return (
        // <div className="loader-container">
            <div className={style.loader}>
                <img  src={imageMotorcycle} alt="Loader" />
            </div>
        // </div>
    );
};

export default LoaderMotorcycle;