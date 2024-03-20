import Image from "../../atoms/image/Image";
import TextContent from "../../atoms/text-content/text-content";
import styles from './ContactInfo.module.css';
const ContactInfo = ({user, userInfo}) => {
    return (
        <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
                <p className={styles.subtitle}>Celular:</p>
                <TextContent text={user.phoneNumber}/>
            </div>
            <div className={styles.contactItem}>
                <p className={styles.subtitle}>Email:</p>
                <TextContent text={user.email}/>
            </div>
            <a href={userInfo.linkedinProfileUrl} className={styles.btnWrapper} target="_blank">
                <button className={`btn ${styles.buttonIcon}`}> 
                    <Image src={"https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"} alt={"LinkedIn"} classList={styles.icon} />
                    <p>Linkedin</p>
                </button>
            </a>
            <a href={userInfo.githubProfileUrl} className={styles.btnWrapper} target="_blank">
                <button className={`btn ${styles.buttonIcon}`}>
                    <Image src={"https://pngimg.com/d/github_PNG58.png"} alt={"Github"} classList={styles.icon}/>
                    <p>Github</p>
                </button>
            </a>
        </div>
    )
}
export default ContactInfo;