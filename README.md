# shorter-links-landing
<img width="100%" src="https://i.ibb.co/47VbFxX/Zrzut-ekranu-2021-05-1-o-19-05-50.png" alt="" />

## Introduction
App idea comes from the FrontendMentor platform:

https://www.frontendmentor.io/dashboard

Live version of the site is available here:

https://mystifying-noyce-56032f.netlify.app/

## How to run the app
1. Clone the repository
2. Simply double click on the index.html file

## Features
- App is displaying correctly on different devices with different screen sizes
- User is able to provide the URL and get it's shortened version
- Provided links are validated before sent to the shortening external service
- If the link is proper - it's getting saved to the localStorage so that it's not gone after the page reload
- Mobile navigation menu
- Each of the links provided by the user can be easily copied to the clipboard with a single click !
- User sees the loader after the form is submitted and he's waiting for the API response

## Tech Stack
- SCSS (mixins)
- BEM
- Vanilla JS (ES6)
- Fetch API
  
## TO DO
- SCSS Refactor 
- BEM naming refactor
- Adding tests
- Some simple and light animations