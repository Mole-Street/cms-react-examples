import styles from '../../styles/filters.module.css';

const Search = ({onChange }) => { 
    return(
        <div className={styles.filter}>
            <label
             htmlFor="searchInput"
            >Filter by name</label>
            <input
             id="searchInput"
             type="search"
             className={styles.input}
             aria-label="Filter by name"
             onChange={onChange} />
        </div>
    )
}

export default Search