const { Field } = require('@igomoon/hubspot-fields-js');

module.exports = function () {
  return [
    Field.image()
      .name('video_poster', 'Video Poster')
      .inlineHelpText('Appears on the page with a play icon over it. All videos play in modals.')
      .set('responsive', false)
      .set('resizable', false)
      .set('show_loading', false)
      .default('https://4949049.fs1.hubspotusercontent-na1.net/hubfs/4949049/excelente-vista.jpg'),
    Field.choice()
      .name('video_source', 'Video Source')
      .id('video_source')
      .choices([
        ['youtube', 'YouTube'],
        ['hubspot', 'HubSpot-hosted Video'],
        ['vimeo', 'Vimeo'],
      ])
      .default('youtube'),
    Field.text()
      .name('youtube_id', 'YouTube Video ID')
      .visibleIf('video_source', 'youtube')
      .inlineHelpText(
        'The YouTube video id can be grabbed from the URL when you view any YouTube video. Usually, it\'s 11 characters, and preceded by "v=".'
      )
      .default('dQw4w9WgXcQ'),
    Field.text()
      .name('vimeo_id', 'Vimeo Video ID')
      .visibleIf('video_source', 'vimeo')
      .inlineHelpText(
        'The Vimeo video id can be grabbed from the URL when you view any Vimeo video. Usually, it\'s 9 characters, and preceded by "vimeo.com/".'
      )
      .default('375468729'),
    Field.file()
      .name('video', 'Video')
      .visibleIf('video_source', 'hubspot')
      .default('https://24480451.fs1.hubspotusercontent-na1.net/hubfs/24480451/movie.mp4'),
  ];
};
