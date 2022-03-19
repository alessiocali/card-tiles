import * as CardTilesConstants from "./constants.js"

Hooks.once('init', registerSettings);

async function registerSettings() {
    await registerScaling();
    await registerPassToBoardStack();
    await registerBoardStackSelector();
}

async function registerScaling() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.SCALING_NAME, {
        name: game.i18n.localize("CardTiles.Settings.Scaling.Name"),
        hint: game.i18n.localize("CardTiles.Settings.Scaling.Hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 1.0,
        range: { min: 0.0, max: 10.0, step: 0.1 },
    });
}

async function registerPassToBoardStack() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.PASS_CARDS_TO_BOARD_STACK, {
        name: game.i18n.localize("CardTiles.Settings.PassCardToBoardStack.Name"),
        hint: game.i18n.localize("CardTiles.Settings.PassCardToBoardStack.Hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
}

async function registerBoardStackSelector() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.BOARD_STACK_NAME, {
        name: game.i18n.localize("CardTiles.Settings.BoardStack.Name"),
        hint: game.i18n.localize("CardTiles.Settings.BoardStack.Hint"),
        scope: "world",
        config: true,
        type: String,
        default: "",
        choices: buildCardStackSelector
    });
}

function buildCardStackSelector() {
    let selector = { "" : game.i18n.localize("CardTiles.Settings.BoardStack.DefaultBoardStackOption") };
    
    let selectorReducer = function (selector, cardStack) {
        selector[cardStack.id] = cardStack.name;
        return selector;
    };

    return Array.from(game.cards).reduce(selectorReducer, selector);
}