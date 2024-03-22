import styles from './Image.module.css';
const Image = ({src,alt,classList}) => {
    return (
        <div className={styles.image}>
            <img src={src} alt={alt} className={classList} draggable={false}/>
        </div>
    )
} 
export default Image;