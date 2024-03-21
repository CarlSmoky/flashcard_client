import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --primary-color: #FFE3CE;
  --secondary-color: #DAF6CC;
  --tertiary-color: #C0C4E9;
  --quaternary-color: #C2F4FF;
  --white-primary: #fff;
  --black-primary: #2E2E2E;
  --black-secondary: #3E3E3E;
  --grey-primary: #3f3f37;
  --grey-secondary: #6b6d76;
  --side-column-border: 0.4rem;
  --side-column-width: 5%;
  
  --primary-font: 'Syncopate';
  --secondary-font: 'Futura';
  --tertiary-font: 'Tahoma';
}

body {
  margin: 0;
  font-family: var(--primary-font);
  background: var(--white);
  color: var(--black-primary);
  line-height: 1.7;
  text-decoration: none;
  user-select: none
}

*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  // This defines what 1 rem is 10px
  font-size: 62.5%; //1 rem = 10px: 10px/16px = 62.5%
  scroll-behavior: smooth;
}

a:link,
a:hover,
a:visited,
a:active {
  text-decoration: inherit;
  color: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

ol,
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  padding: 0;
  border: none;
  background: none;
}

.App {
  text-align: center;
}

.visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(100%); 
    height: 1px; 
    overflow: hidden; 
    position: absolute; 
    white-space: nowrap; 
    width: 1px; 
}

`
export default GlobalStyles