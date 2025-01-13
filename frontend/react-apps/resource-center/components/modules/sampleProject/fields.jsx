import React from 'react';
import {
  FieldGroup,
  ModuleFields,
  RepeatedFieldGroup,
  BooleanField,
  TextField,
  ColorField,
  NumberField,
} from '@hubspot/cms-components/fields';

/**
 * Here we are defining module fields that will show up for marketers in the page editor so they can customize the module
 * We also define default field values
 */
export const fields = (
  <ModuleFields>
    <FieldGroup name="sample_field_group" label="Sample Field Group" expanded={false}>
      <TextField
        label="Sample Title"
        name="text"
        default="MoleStreet React Base"
        required
      />
      <TextField
        label="Sample Subheader"
        name="subtext"
        default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        required
      />
      <BooleanField label="Sample Boolean Text" name="sample_boolean" />
    </FieldGroup>
    <RepeatedFieldGroup
      name="sample_filters"
      label="Sample Filter"
      occurrence={{
        min: 1,
        max: 500,
        default: 5,
      }}
    >
      <TextField
        label="Filter"
        name="filter"
        default="test"
        required
      />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="sample_repeater_group"
      label="Sample Repeater Group"
      occurrence={{
        min: 1,
        max: 500,
        default: 10,
      }}
    >
      <TextField
        label="Text"
        name="text"
        default="Sample Text"
        required
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
