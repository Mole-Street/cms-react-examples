const { Field, Group } = require('@igomoon/hubspot-fields-js');

// add button styles here
const buttonStyles = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['tertiary', 'Tertiary'],
];

module.exports = function (defaultValue, id, defaultStyle) {
  id = id || '';
  // update the below default with the correct default style
  defaultStyle = defaultStyle || 'primary';
  return new Group().name(`${id ? 'cta_button__' + id : 'cta_button'}`, 'CTA Button').children([
    Field.choice()
      .id(id ? `cta_type__${id}` : 'cta_type')
      .name('cta_type', 'CTA Type')
      .choices([
        ['hubspot-cta', 'HubSpot CTA'],
        ['link', 'Link'],
      ])
      .default('link'),
    Field.text()
      .name('button_label', 'Button Label')
      .default(defaultValue)
      .visibleIf(id ? `cta_type__${id}` : 'cta_type', 'link', 'EQUAL'),
    Field.choice()
      .name('button_style', 'Button Style')
      .choices([...buttonStyles])
      .default(defaultStyle),
    Field.choice()
      .name('button_color_scheme', 'Button Color Scheme')
      .choices([
        ['dark', 'Dark (for light backgrounds)'],
        ['light', 'Light (for dark backgrounds)'],
      ]),
    Field.cta()
      .name('cta', 'CTA')
      .visibleIf(id ? `cta_type__${id}` : 'cta_type', 'hubspot-cta', 'EQUAL'),
    Field.link()
      .name('link', 'Link')
      .visibleIf(id ? `cta_type__${id}` : 'cta_type', 'link', 'EQUAL'),
  ]);
};
