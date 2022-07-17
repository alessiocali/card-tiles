# Card Tiles
Allows you to Drag-n-Drop Cards from you Card Collections onto the game board and automatically create a tile that represents the card. The card face can be iterated by clicking on it (requires [Monk's Active Tile Triggers](https://foundryvtt.com/packages/monks-active-tiles) and [Warpgate](https://github.com/trioderegion/warpgate)).

## Todos
* Map a card 1-to-1 with its Tile representation (for recalling cards to decks).
* Avoid blocking the board drag-n-drop listener for the purpose of this module.
* Remove dependency from Monk's plugin (no hard feelings, but less dependencies the better).

## Changelog

### v0.1.0 
* Fixed an issue which prevented players from playing cards on the canvas. Now Warpgate is a required dependency.
* Bumped version to 0.1.0 despite being a fix because it was becoming impossible to distinguish feature additions (minors) from hotfixes.

### v0.0.6
* Fixed an issue which caused confusion when dealing dealt cards from a deck.
* Fixed a bug which caused the module to not work properly with the latest version of Monk's Tiles.

### v0.0.5
* New localization: Japanese 🍙 (thanks to @BrotherSharper), Italian 🍕.
* Added more default options for card sizes: default to deck sizes, or setting preferences (suggested in #10).

### v0.0.4
Now cards dragged onto the canvas show their current face when played.

### v0.0.3
* Added a setting to scale uniformly card tiles when played on the canvas.
* Added a setting to decide a target card stack where cards are going to be transferred upon being played on the canvas.

### v0.0.2
Fixed tile size being incorrect even when card size is set.

### v0.0.1
Initial release with bare minimum support.

## Contributors
* [BortherSharper](https://github.com/BrotherSharper) for the Japanese localization.
* [SalieriC](https://github.com/SalieriC) for the drawn card and player fixes.

## Special thanks
* [u/killercrd](https://www.reddit.com/user/killercrd/) for the [macro](https://www.reddit.com/r/FoundryVTT/comments/sxdwuv/macro_deal_and_place_cards_in_current_scene_as/) that was used as the base for this module 
* [u/Sherbniz](https://www.reddit.com/user/Sherbniz/) for [spurring the discussion](https://www.reddit.com/r/FoundryVTT/comments/t7ihui/placing_cards_on_a_grid_and_show_them_to_players/) and suggesting/coding the support to Monk's Active Tile Triggers.
