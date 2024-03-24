import ActionIcon from "../../atoms/action-icon/ActionIcon";
import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import TextContent from "../../atoms/text-content/text-content";
import styles from './InfoItem.module.css';
const InfoItem = ( {itemId, imgSrc, title, subtitle, startDate, endDate, description, hasPermissionToEdit, itemHref, onEdit, classList, onDelete , ...links} ) => {
    const extractYearFromDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };
    const pageLinks = links.links;
    const handleEditClick = () => {
        onEdit({
            imgSrc,
            title,
            subtitle,
            startDate,
            endDate,
            description
        });
    };
    const handleDeleteClick = () => {
        onDelete({itemId});
    };

    const startYear = extractYearFromDate(startDate);
    const endYear = extractYearFromDate(endDate);

    const renderLinkText = () => {
        if (pageLinks) {
            return pageLinks.map((link, index) => {
                let linkText = "";
                switch (link.pageName) {
                    case "github":
                        linkText = "Link al repositorio";
                        break;
                    case "project":
                        linkText = "Link al proyecto";
                        break;
                    case "certification":
                        linkText = "Link al certificado";
                        break;
                    default:
                        linkText = "Abrir en nueva pestaña";
                        break;
                }

                return (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                        {linkText}
                    </a>
                )
            });
        } else {
            return null; // Retorna null si links es undefined
        }
    };

    return(
        <div className={`${styles.infoItem} ${classList} infoItem col row`}>
            {imgSrc && (
                <div className={`${styles.imageWrapper} col-md-4 col-12`}>
                    <Image src={imgSrc} alt="Profession image" classList={styles.img}/>
                </div>
            )}
            <div className={`${styles.contentWrapper} col-md-8 col-12`}>
                <div className={styles.titleWrapper}>
                    <TextContent text={title} classList={styles.title}/>
                    {hasPermissionToEdit && (
                        <div className={`d-flex flex-row`}>
                            <EditIcon onclick={handleEditClick}/>
                            <ActionIcon classList={`fa-trash-alt`} classname={styles.trash} onClick={handleDeleteClick}/>
                        </div>
                    )}   
                </div>
                {renderLinkText()}
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