import Banner from "../../molecules/banner/Banner";
import PersonalData from "../../molecules/personal-data/PersonalData";
import Profile from "../../molecules/profile/Profile";
import defaultProfilePic from '../../../../src/assets/img/defaultProfilePic.jpg';
import styles from './UserInfo.module.css';
const UserInfo = ({ user, userInfo, hasPermissionToEdit }) => {
    const bannerPicUrl = userInfo.bannerPicUrl;
    const defaultImageUrl = "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"; 
    const profilePic = userInfo.profilePicUrl;
    return (
        <section className={styles.userInfo}>
            <div className="row">
                <div className="col-12">
                    <Banner imageUrl={bannerPicUrl ? bannerPicUrl : defaultImageUrl} hasPermissionToEdit={hasPermissionToEdit} />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Profile imageUrl={profilePic ? profilePic : defaultProfilePic} hasPermissionToEdit={hasPermissionToEdit} className={styles.profilePic}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xs-12">
                    <PersonalData user={user} userInfo={userInfo} hasPermissionToEdit={hasPermissionToEdit} />
                </div>
            </div>
        </section>
    )
};
  
export default UserInfo;