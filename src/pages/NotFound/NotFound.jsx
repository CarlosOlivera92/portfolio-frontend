import { NavLink } from 'react-router-dom';
import TextContent from '../../components/atoms/text-content/text-content';
import styles from './NotFound.module.css';
import Image from '../../components/atoms/image/Image';
import notFoundImage from '../../assets/img/404.png';
const NotFound = ( ) => {
    return (
        <div className={`${styles.notFoundContainer} container`}>
            <div className={`${styles.notFound }`}>
                <Image src={notFoundImage} alt={"Not Found"} classList={styles.image}/>
                <TextContent text={"OOPS!"}/>
                <TextContent text={"Parece que la página que estás buscando no existe."}/>
                <NavLink to={"/"} > Volver a inicio </NavLink>
            </div>
        </div>
    )
} 
export default NotFound;