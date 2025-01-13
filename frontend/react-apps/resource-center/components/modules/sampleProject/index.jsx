import { Island } from '@hubspot/cms-components';
import { useState } from 'react';
import listing from '../../islands/listing.jsx?island';
import Layout from '../../Layout.jsx';
import styles from '../../../styles/index.module.css';

export const Component = ({ fieldValues, hublParameters = {}, dataQueryResult }) => {
  const getResourceCenterCollection = dataQueryResult.data.HUBDB.react_resource_center_collection.items || []
  return (
    <Layout>
    <section className={styles.center}>
        <Island
          fieldValues = { fieldValues }
          module={listing}
          dataQueryResult = {getResourceCenterCollection}
          hydrateOn="load"
        />
      </section>
    </Layout>
  );
};
export { fields } from './fields.jsx';
export { query } from './query.js';
export const meta = {
  label: `Sample Project`,
};
