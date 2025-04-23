import { useState, useEffect } from 'react';
import DataListing from '../partials/dataListing.jsx'
import Header from '../partials/header.jsx'
import Search from '../partials/search.jsx'
import Select from '../partials/select.jsx'
import styles from '../../styles/filters.module.css'

const Listing=({ dataQueryResult, fieldValues })=>{ 
  const {sample_field_group: {text:sampleFieldText, subtext:sampleFieldSubtext}, sample_filters }=fieldValues
  const [resourceData, setResourceData]=useState(dataQueryResult) 
  const [filterValues, setFilterValues]=useState({
    search: '',
    select: ''
  });

  const handleSearch=(e)=>{ 
    const searchValue=e.target.value
    setFilterValues((prevState)=>({ ...prevState, search: searchValue }));
  }

  const handleSelect=(e) => { 
    let selectValue=e.target.value 
    if (e.target.selectedIndex == 0) { 
      selectValue=''
    }
    setFilterValues((prevState)=>({...prevState, select: selectValue })) 
  }

  return( 
    <>
      <Header
        text={sampleFieldText}
        subtext={sampleFieldSubtext} 
      />
      <section className={styles.filters}> 
        <Search 
          onChange={handleSearch}
        />
        <Select
          filters={sample_filters}
          data={resourceData}
          onChange={handleSelect}
        />
      </section>
      <DataListing
        searchFilterValue={filterValues.search.toLocaleLowerCase() || ''}
        selectFilterValue={filterValues.select.toLocaleLowerCase() || ''}
        data={resourceData}
      /> 
    </>
  )
}
export default Listing;
