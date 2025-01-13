import styles from '../../styles/filters.module.css';

const Select = ({onChange, filters}) => { 
    return(
        <div className={styles.filter}>
            <label
            htmlFor="topicSelect"
            >Filter by Topic</label>
            <select
                id="topicSelect"
                onChange={onChange}
                className={styles.select}
                aria-label="Filter by Topic"
                defaultValue=""
            >
                <option defaultValue>all</option>
                { filters.map( (filter, index) => { 
                    return(
                        <option key={index}>{filter.filter}</option>              
                    )     
                })}
            </select>
        </div>
    )
}

export default Select