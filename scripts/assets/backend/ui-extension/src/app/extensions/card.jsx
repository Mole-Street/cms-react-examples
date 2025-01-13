import React from 'react';
import { hubspot } from '@hubspot/ui-extensions';

// Define the extension to be run within the Hubspot CRM
hubspot.extend(() => <REPLACE_NAME />);

// Define the Extension component
const REPLACE_NAME = () => {
  return <div>Welcome to the ${pascal_case_name} UI Extension!</div>;
};
