//References to document objects to receive input from and modify
const customName = document.getElementById('customname');
const randomize = document.querySelector('randomize');
const story = document.querySelector('story');

//Provides a random index for an array
function randomValuesFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return random;
}

//These store the text used to generate the story
const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day." 
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

//Set an event handler to call our generator function in response to clicking the 'randomize' button
randomize.addEventListener('click', result);

//The callback function that generates a new story and displays it
function result() {
    //Write a new story
    let newStory = storyText;
    let xItem = insertX[randomValuesFromArray(insertX)];
    let yItem = insertY[randomValuesFromArray(insertY)];
    let zItem = insertZ[randomValuesFromArray(insertZ)];

    //Substitute the randomized selections into the text of the story
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

    //Replace the name of the witness if a custom name was provided
    if (customName.value != '') {
        const name = customName.value;
        newStory = newStory.replace('Bob', name);
    }

    //Convert the units of temperature and weight to UK equivalents if the 'UK' option was selected
    if (document.getElementById("uk").checked) {
        const temperature = Math.round(convertFahrenheitToCelsius(94)) + " centigrade";
        const weight = Math.round(convertPoundsToStone(300)) + " stones";

        newStory = newStory.replace('94 fahrenheit', temperature);
        newStory = newStory.replace('300 pounds', weight);
    }

    //Writes the generated story to the hidden paragraph and makes it visible
    story.textContent = newStory;
    story.style.visibility = 'visible';
}

function convertFahrenheitToCelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * 5 / 9;
    return celsius;
}

function convertPoundsToStone (pounds) {
    let stones = pounds / 14;
    return stones;
}