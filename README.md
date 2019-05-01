# Neo-Noir

![image](https://github.com/DigitalDW/neo_noir/blob/master/images/screenshot.png)

## Project overview

The Neo-Noir project was realized as a validation project for Isaac Pante's "Publication Numérique" class. The basic idea was to create an interactive cyberpunk story easily accessible and integrable on the web. Therefore, the project was made using web-development technologies such as JavaScript (ES6), HTML5 and CSS3.

## Presentation

This is a story where **you** are the hero. You finish your shift and decide to go get a drink at the bar. What happens next depends on you!

The data structure is fairly simple:

```javascript
const story = {
    scene1: {
        text: () => `some text`,
        choices: [ {
            option: () => `option 1 text`,
            action: () => {
                // list of actions
            }
        },
        {
            option: () => `option 2 text`,
            action: () => {
                // list of actions
            }
        },
        {
            option: () => `option 3 text`,
            action: () => {
                // list of actions
            }
        }
        ]
    },
    scene2: {
        // ...
    }
}
```

All the functions starting the game, loading the texts, displaying the choices and playing the musics are well integrated. To continue the story, you just need to add some scenes and make sure you redirect the user to the correct scene after an interaction with the choices.

To do so, call these functions:

```javascript
// to load the next scene:
loadNextText(story.myScene);

// to load a new music:
changeMusic("./audio/my_music.mp3");

// to modify and save game statistics, use the following object:
status.myCustomStatus = //something

// to save your stats, use this function:
localStorage.setItem('game', JSON.stringify(status));
```

That should be it! Have fun playing the game!

## Further development and ideas

This section presents the future updates that I would like to implement:

* Extract the `const story` and make it a .JSON external file
* Create a `save()` function in order to facilitate code-reading
* Continue the story
* To be determined...

## Disclaimer

This story has been coded with musics in mind. For copyright reasons, all the musics were changed for silent sound files. In order of appearance, the songs are:

* [Tainted with one kiss by DEADLIFE](https://newretrowave.bandcamp.com/track/tainted-with-one-kiss)
* [Femme Fatale by Perturbator](https://perturbator.bandcamp.com/track/femme-fatale-feat-highway-superstar)
* [Resonance by HOME](https://midwestcollective.bandcamp.com/track/resonance)
* [Turbo Killer by Carpenter Brut](https://carpenterbrut.bandcamp.com/track/turbo-killer)
* [Days of Thunder by The Midnight](https://themidnight.bandcamp.com/album/days-of-thunder)
* [Limelight by YOTA](https://newretrowave.bandcamp.com/track/limelight)
* [Gloria by The Midnight](https://themidnight.bandcamp.com/track/gloria)
* [Rust by El Huervo](https://elhuervo.bandcamp.com/track/rust)
* [Untitled by The Green Kingdom](https://thegreenkingdom.bandcamp.com/track/untitled-2)

If you want to live the full experience, please consider buying the artists' musics and putting the audio files inside the `./audio` folder. Don't forget to rename them in order for the program to find them!

### Thank you for reading!

