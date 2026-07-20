# Preview

A preview of this work can be viewed at the [Github Pages](https://baileynmc.github.io/pet-sitting-service/) deployment.

## Running Locally

The work can be run locally by doing `pnpm dev`, and the tests can be run with `pnpm test`.

## AI Usage

ChatGPT was used to generate Lorem Ipsum/content text for the landing page.

For components, Claude was utilized for the icon radio in the booking form and the card used in the Admin view with the list of bookings with some modification to use the CSS variables I had set up already.

Claude also helped implement vitest and test cases after suggesting it would be easier than debugging my jest setup.

Otherwise, I implemented the styling and shared component setup, and the rest of the components in the project.

## React Native

The key parts that could be shared with a React Native implementation are types, the util with the pet label options, and the functionality for getting price information.

There would have to be some updates to have a working UI portion for a React Native implementation. There would need to be a different navigation than the hashRouter, and it would be best to have a new component such as a bottom navigator/footer to align with common mobile app UX patterns. Some of the styling logic implemented in the styled-components could be reused, but they would need to add the styles on to Native's View and Text components for example instead of div and h1/h2/etc elements. There is also not css-variable support, so that setup could be implemented as a theme object/provider that is supplied to the app and the web version.

## Credits

Icons are from FontAwesome and stock photos are from Pexels.
