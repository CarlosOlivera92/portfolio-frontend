import logoImage from '../../../assets/img/logo/logo.png'

const Logo = () => {
    return (
        <div className="logo d-flex flex-row align-items-center">
            <img src={logoImage} alt="Logo" />
            <h1 className='m-0'>Solo Resume</h1>
        </div>
    )
}
export default Logo;