# HubSpot Theme: ~replace_name~

## Overview

<!--
    Provide a brief description of the theme and its purpose. Mention if this is a custom theme or based on an existing boilerplate or template.
-->

## Features

<!--
    List the key features of the theme. Mention any specific tools, integrations, or unique elements of the theme.
    Example: list the modules and their names, number of templates, etc.
-->

## Organization

- '/src' folder is the true theme package.
- '/config' folder is anything you'd need to develop, including scss partials, mixins, and theme partials.

### Module setup

Modules have a `module.scss` & `module.jsx` file (instead of module.css & module.js). These files are compiled into their HubSpot CMS versions by webpack. This allows us to use updated technology, especially SCSS mixins and variables, to scale our code.

Modules additionally have a fields.js file instead of fields.json. This utilizes hubspot-fields-js to keep our module fields consistent, as well as easier to read. Note there is a separate c

## Installation

### Prerequisites

<!--
    List any prerequisites that need to be installed before using this theme, such as HubSpot CMS, Node.js, or any other dependencies.
-->

### Getting started

1. Clone the repository to your local machine. You can use an SSH key to clone it, or download the zip file. If you choose to download the zip file, unzip it before proceeding.

2. Open up the repository in your preferred code editor. Open up a new terminal, and navigate to the respository's folder.

3. In that folder, run `npm i` to install dependencies. The primary dependencies are the Babel and Webpack.

4. Next, you'll authorize with existing HubSpot accounts. Run `hs init` to generate a `hubspot.config.yml` file for the first time.

5. Authorize with a development sandbox first. When asked "Enter a unique name to reference your account", name this account 'DEV'. It'll be the default when you go to upload.

You're now set up to use this repository on your local machine.

### Workflow

There are two main command line workflows in this repository. Because of that, it's recommended you have two terminals open at once.

In terminal 1:

- Run `npm run start` to upload changes to your production sandbox ('DEV' in your `hubspot.config.yml`). This will start webpack, compiling modules and templates into /dist, and then uploading them to your sandbox.

In terminal 2:

- Run `npm run start-fields`. This starts up the hubspot-fields-js CLI. When you save a fields.js file, it will get compiled into field.json. Note that you will need to save the file after starting this CLI to get the fields compiled.

To make your changes:

1. Run the two terminal commands above.
2. Create a page and add the module you're working on.
3. Open up a new git branch off of `main` and make changes.
4. Publish a version of your page in your sandbox (noindex).
5. Commit your changes and push branch to git.
6. Open up a PR in the repo. Include a link to your sandbox page and the Asana task.

## Dependencies

<!--
    List any dependencies required to use the theme, such as specific 3rd party packages.
-->

## Notes

<!--
    Mention any additional considerations such as performance, security, or limitations.
    You may also include known issues or future updates if applicable.
-->

## Known Issues

- This project doesn't currently support a file under /src/scss named anything other than the project name. Webpack is hard, okay? If you wanna poke at it, it's something up with the outputJsFilename command in the webpack config and how the pathData is constructed. I could not figure it out.
- hubspot-fields-js hasn't been updated in over a year, and it's missing some critical pieces (the styles tab, and all style-related fields). If we'd like to use it, we'll need to fork it and maintain it ourselves. Chris is looking into this.
- hubspot-fields-js current webpack plugin isn't compatible with Webpack 5, which this utilizes. It'd be nice to condense this into one command, instead of two simultaneous terminals. Not critical, but you know how I feel about extra clicks.
