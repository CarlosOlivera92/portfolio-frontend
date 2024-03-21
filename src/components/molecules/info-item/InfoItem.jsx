import ActionIcon from "../../atoms/action-icon/ActionIcon";
import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import TextContent from "../../atoms/text-content/text-content";
import styles from './InfoItem.module.css';
const InfoItem = ( {imgSrc, title, subtitle, startDate, endDate, description, hasPermissionToEdit, itemHref} ) => {
    const extractYearFromDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    // Extraer solo el año de las fechas de inicio y fin
    const startYear = extractYearFromDate(startDate);
    const endYear = extractYearFromDate(endDate);
    return(
        <div className={`${styles.infoItem} col row`}>
            <div className={`${styles.imageWrapper} col-md-4 col-12`}>
                <Image src={imgSrc} alt="Profession image" classList={styles.img}/>
            </div>
            <div className={`${styles.contentWrapper} col-md-8 col-12`}>
                <div className={styles.titleWrapper}>
                    <TextContent text={title} classList={styles.title}/>
                    {hasPermissionToEdit && (
                        <div className={`d-flex flex-row`}>
                            <EditIcon/>
                            <ActionIcon classList={"fa-trash-alt"} />
                        </div>
                    )}   
                </div>
                {itemHref && (
                    <a href={itemHref} target="_blank">Abrir en nueva pestaña</a>
                )}
                <TextContent text={subtitle} classList={styles.subtitle}/>
                {startDate && endDate && (
                    <TextContent text={`Desde ${startYear} | Hasta ${endYear}`} />
                )}
                <TextContent text={description} />
            </div>
        </div>
    )
} 
export default InfoItem;