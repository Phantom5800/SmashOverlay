# InGameOverlay

Contains a web page that can be used for tournament overlays, customizable by just swapping out the CSS. Has mouse controls for changing all the fields and supports character portraits.

# How to Use
1. Download the latest version of the package's master branch (https://github.com/Phantom5800/streamoverlay/archive/refs/heads/master.zip) or check-out the package through GitHub.
2. Extract all content from the zip file, and open the index.html file located in the InGameOverlay folder with your browser of choice.
3. Choose your overlay settings such as Organization, Game, and whether we should use character portraits or stock icons on the overlay. Text fields are optional.
4. We recommend you keep the hotkeys enabled, as they are very useful for stream operation. The hotkey list can be found below. If you are able to edit code, you can very easily reassign these hotkeys.
5. Copy the generated URI, and add it as a browser source on your stream application such as OBS or Streamdeck.
6. To update the overlay while in game, simply interact with the browser source.
7. When filling the character name field, the program supports some short form names such as "puff" or "falcon".
8. If the overlay tool ever becomes unresponsive due to a text-input field related, refresh or reload the browser window.

Overlay Tool Instructions:
Left click on a score to increment the score.
Right click on a score to decrement.
Left click on player name area or round title to change the field.
Right click on a player name area to change the displayed character.
Left click on the logo to reset game counts.
Right click on the logo to swap player sides.

Stream Deck Support:
In Streamlabs, right click on the browser source and select Interact, the interact window will need to remain in focus for any hot keys to work.
For text entry, the prompt may appear behind other windows at first, but it should be available in your task bar.
Hotkeys to bind in Stream Deck:
P1 Increment Score: j
P1 Decrement Score: n
P2 Increment Score: k
P2 Decrement Score: m
Reset Scores: u
Change P1 Name: o
Change P2 Name: p
Change P1 Character: semi-colon
Change P2 Character: single quote
Swap Sides: y
Change Round: comma
