# Amazing Atoms

Welcome to Amazing Atoms! Amazing Atoms is an interactive quiz game where users can test and improve their knowledge about atoms. There are four possible answers for each question and once the user selects an answer, the correct answer is shown and explained for each question, so they can learn about atoms as they play! 

<img src="docs/mockup-screen-image.png">

## Live Website
[Amazing Atoms](https://shizukadonaghue.github.io/atomic-quiz/)

## Repository
<https://github.com/ShizukaDonaghue/atomic-quiz>

## UX & Desgin
### Overview
Amazing Atoms has been designed to help users test and improve their knowledge about atoms, regardless of their level of knowledge. The overall objective of the game is for users to have some fun while they learn about atoms.  

### User Stories
As a user,
* I would like to test and improve my knowledge about atoms
* I would like a clean and uncluttered website that is intuitive and easy to navigate
* I would like to be able to play the game on any devices
* I would like to understand how to play the game
* I would like clear visual feedback when I submit my answer so that I know whether my answer is correct
* I would like to know how well I did in the game when finished
* I would like to be able to quit or restart the game at any point

### Website Structure
The website consists of two HTML pages. The main page contains all the contents related to the game and the second page is used in case of 404 error. 

With the contents for the game being on a single HTML page, JavaScript scrits in script.js are used to hide and unhide sections of the main page based on the intractions with the user. For example, the landing page is the start section of the main page and when the user clicks on the start button to play the game, the start section is hidden and the game section is displayed. Once the game is initiated, a series of randomised questions is displayed which are stored in questions.js file. 

### Wire Frames
Wireframes were generated using [balsamiq](https://balsamiq.com/) to visualise the structure of the website. The structure of the finished website is slighly different from the wireframes due to development that occurred during the building process, however, it largely remained the same.

<details>
  <summary>Mobile</summary>

  <img src="docs/wireframes/wireframe-mobile-sections.png" width="100%">

</details>

<details>
  <summary>Tablet</summary>

  <img src="docs/wireframes/wireframe-tablet-start-section.png" width="49%">
  <img src="docs/wireframes/wireframe-tablet-rule-section.png" width="49%">
  <img src="docs/wireframes/wireframe-tablet-game-section.png" width="49%">
  <img src="docs/wireframes/wireframe-tablet-result-section.png" width="49%">
  <img src="docs/wireframes/wireframe-tablet-error.png" width="49%">

</details>

<details>
  <summary>Desktop</summary>
  
  <img src="docs/wireframes/wireframe-desktop-start-section.png" width="80%">
  <img src="docs/wireframes/wireframe-desktop-rule-section.png" width="80%">
  <img src="docs/wireframes/wireframe-desktop-game-section.png" width="80%">
  <img src="docs/wireframes/wireframe-desktop-result-section.png" width="80%">
  <img src="docs/wireframes/wireframe-desktop-error.png" width="80%">

</details>
  
### Colour Scheme
The colour scheme for the website has taken inspiration from the background image of atoms. The light blue E5F7FF is used as the background colour for all the contents and the dark navy 0B2C58 is used for texts so that it contrasts well with the background colour. The dark navy is also used for the buttons with texts in white FFFFFF and the ligher blue 71C2E4 is used for hover effects on the control buttons. 

Red E92A2A and green 2AE459 are used for the answer buttons to indicate whether the answer selected by the user is correct. 

This colour scheme is consistent throughout the website and intended to provide a clean and scientific feel with the background image of atoms.

<img src="docs/colour-palette.png" width="80%">

### Typography
The font used throughout the website is Ubuntu which is imported from [Google Fonts](https://fonts.google.com/). It is easy to read and suits the image of the website.

## Features
### Existing Features
#### Logo
The logo for the website features an image of an atom and the name of the website. There are two versions for the logo and the main logo is used all sections, except for the game section where the smaller one is used to allow more space for the game contents. The logos are linked to the start section of the main page, so that the user can easily navigate back to the start section, or restart the game while playing the game.

<img src="assets/images/logo.jpg" width="20%">

<img src="assets/images/logo-small.jpg" width="6%">

#### Favicon
The favicon was created from the logo to help the user locate the website easier when they have multiple tabs open in their browswer. 

<img src="assets/images/favicon.png" width="3.5%">

#### Start Section (Landing Page)
The start section of the main page is the landing page for the website. It includes an introduction to the game and a name entry field. The question mark next to the name input field displays the requirements for the name entry field, which are validated with JavaScripts in scripts.js so that the game is only initiated once the user provides a name that satisfies the requirements. If the name provided does not satisfy the requirement, an alert is displayed to let the user know the requirements. The name provided here is used in the result page to provide a more personal feel when the game is finished. 

From the this page, the user can either view the rules or start the game.

<img src="docs/start-section-image.png" width="80%">

#### Rule Section
This section explains the rules for the game and how the score is calculated. The user can go back to the start section by either clicking on the "X" button at the bottom or the logo at the top.

<img src="docs/rule-section-image.png" width="80%">

#### Game Section
There are 8 questions in total and they are shuffled for each game. The current number of question is displayed at the top to let the user know their progress in the game.

There are 4 possible answers for each quesiton and once the user selects an answer, the correct answer turns green and if the user's answer is incorrect, the selected answer turns red to provide a visual feedback to the user as they play the game. Once an answer is selected, answer buttons are disabled, so only the first answer is considered for each question.

When the answer is revealed, the answer is also explained below the answer buttons so that the user can learn more about atoms to improve their knowledge.

The "Next" button is only displayed once the user selects an answer, so that the user must select an answer before they can progress to the next question. 

If the user decides to quit or restart the game, they can easily navigate back to the start section by clicking on the logo. 

<img src="docs/game-section-image.png" width="80%">

#### Result Section
When the user finish the game, the result page is displayed and let the user know how well they have done in the game. The name entered at the start of the game is used here to personalise the message. Depending on the score, different messages are displayed to encourage the user to play the game again to improve their knowledge. 

The "Play Again!" button resets the game and shuffles the questions, and takes the user back to a new first question. 

If the user decides to restart the game, they can do so by clicking on the logo which takes them back to the start section where they can enter a new name and start a new game.

<img src="docs/result-section-image.png" width="80%">

#### 404 Error Page
In case of 404 error, this 404 error page is displayed. It features the logo and the "Home" button. The user can click on either of these to easily navigate back to the start section. 

<img src="docs/error-page-image.png" width="80%">

### Feasures Left to Implement
The website currently contains a set of 8 questions. It will benefit by having additonal sets of questions for different difficulty levels that the user can choose from. The current set of questions will be categorised as "Easy" and as the user improve their knowledge, they can progress to "Medium" or "Hard" set of questions to further improve their knowledge on atoms. 

## Technologies Used
### Languages
* [HTML](https://html.spec.whatwg.org/) was used to create the contents and structure for the website.
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html) was used to add styling to the website.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) was used to create interactive contents for the website. 

### Tools used for Developing the Website
* [Gitpod](https://www.gitpod.io/) was used to create, edit and preview the codes during development.
* [Git](https://git-scm.com/) was used for version control and tracked changes in the codes.
* [GitHub](https://github.com/) was used to store the codes and deploy the website.
* [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/) were used extensively while adjusting the objects in the website for different screen sizes.
* [balsamiq](https://balsamiq.com/) was used to generate wireframes for the website.

### Tools used for Styling the Website
* The logo was designed by the developer with [Wix](https://www.wix.com/).
* The favicon was created from the logo with [RealFaviconGenerator](https://realfavicongenerator.net/).
* The font used in the website is imported from [Google Fonts](https://fonts.google.com/).
* The website uses icons from [Font Awesome](https://fontawesome.com/).
* The website uses [cdnjs.com](https://cdnjs.com/) for Font Awesome icons so that the website loads quickly.
* The colour scheme ideas and actual colour palette were generated with [Coolors.co](https://coolors.co/).
* [remove.bg](https://www.remove.bg/) was used to remove the background from the 404 error image and the favicon.

### Tools used for Validating the Website
* [W3C HTML Validator](https://validator.w3.org/) was used to validate HTML codes.
* [W3C CSS Validator](https://validator.w3.org/) was used to validate CSS codes.
* [JSHint](https://jshint.com/) was used to validate JavaScript codes.
* [a11y Color Contrast Accessibility Validator](https://color.a11y.com/Contrast/) was used to check the colour contrast for accessibility.

### Other Online Resources used 
* [Commpressor.io](https://compressor.io/) was used to compress the images for the website so that the website loads quickly.
* [Multi Device Website Mockup Generator](https://techsini.com/multi-mockup/index.php) was used to generate the mockup image showing the website on various screen sizes.
* [Grammarly](https://app.grammarly.com/) was used to fix grammatical errors across the website.


## Testing

### Code Validation

### Lighthouse

### Browser Compatibility

### Responsiveness

### User Stories

### Resolved Bugs

### Unresolved Bugs

## Deployment
### Deploying a GitHub Repository to GitHub Pages
### Forking the GitHub Repository
### Creating a Local Clone

## Credits
### Content
* Quiz questions and answers were sourced from [ThoughtCo.](https://www.thoughtco.com/what-do-you-know-about-atoms-609620).

### Media
* The background image for the website was sourced from [pixabay.com](https://pixabay.com).
* The 404 error image was sourced from [freepik](https://www.freepik.com/).


### Codes
* The code to randomise a Javascript array in script.js was from [JavaScript.info](https://javascript.info/task/shuffle).
* The code for box-shadow in style.css was from [CSS Scan](https://getcssscan.com/css-box-shadow-examples).

## Acknowledgements
