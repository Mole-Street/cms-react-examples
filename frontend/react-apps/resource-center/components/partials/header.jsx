import styles from '../../styles/header.module.css';

const Header = ({text, subtext}) =>{ 
    return( 
        <header>
        <h1 className={ styles.header }>
            {text} 
        </h1>
        <p>
            {subtext}
        </p>
        </header>
    )
}

export default Header