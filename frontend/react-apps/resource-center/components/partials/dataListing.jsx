import  styles from '../../styles/dataListing.module.css'

const DataListing = ({searchFilterValue, selectFilterValue, data}) => {
    const filteredData = data.filter(
        item =>{ 
            const itemName = item.name.toLowerCase()
            const itemLabel = item.topic.label.toLowerCase()
            return itemName.includes(searchFilterValue) && itemLabel.includes(selectFilterValue);
        }
    ) 
    return( 
        <section className={styles.listing}> 
            { filteredData.map( (item) =>{
            return( 
                    <a
                    href={item.link}
                    className={styles.card}
                    key={item.link}>
                        <div 
                            className={styles.resourceImage}
                            style={{ backgroundImage:`url(${item.image.url})`}}
                        >
                        </div>
                        <div className={styles.meta}>
                            <div className={styles.date}>{ item.date }</div>
                            <div className={styles.topic}>{item.topic.label}</div>
                        </div>
                        <h3>{ item.name }</h3>
                        <p>{item.description}</p>
                        <div className={styles.learnMore}>Learn More</div>
                    </a>
                )   
            })}
        </section>
    )
}

export default DataListing