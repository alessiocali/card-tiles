import * as CardTilesConstants from "./constants.js"

Hooks.once('init', registerSettings);

async function registerSettings() {
    await registerScaling();
    await registerPassToBoardStack();
    await registerBoardStackSelector();
    await registerDealAfterDrawn()
    await registerDefaultCardSizes();
    await registerMoveThatForYouSettings()
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

async function registerDealAfterDrawn() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEAL_AFTER_DRAWN_FROM_DECK_NAME, {
        name: game.i18n.localize("CardTiles.Settings.DealAfterDrawn.Name"),
        hint: game.i18n.localize("CardTiles.Settings.DealAfterDrawn.Hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
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

async function registerDefaultCardSizes() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEFAULT_HEIGHT_NAME, {
        name: game.i18n.localize("CardTiles.Settings.DefaultHeight.Name"),
        hint: game.i18n.localize("CardTiles.Settings.DefaultHeight.Hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 100
    });

    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEFAULT_WIDTH_NAME, {
        name: game.i18n.localize("CardTiles.Settings.DefaultWidth.Name"),
        hint: game.i18n.localize("CardTiles.Settings.DefaultWidth.Hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 100
    });
}

async function registerMoveThatForYouSettings() {
    await game.settings.register(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.MOVE_THAT_FOR_YOU_NAME, {
        name: game.i18n.localize("CardTiles.Settings.MoveThatForYou.Name"),
        hint: game.i18n.localize("CardTiles.Settings.MoveThatForYou.Hint"),
        scope: "world",
        config: true,
        type: String,
        default: "",
        choices: {
            "none" : game.i18n.localize("CardTiles.Settings.MoveThatForYou.None"),
            "movement" : game.i18n.localize("CardTiles.Settings.MoveThatForYou.MovementOnly"),
            "rotation" : game.i18n.localize("CardTiles.Settings.MoveThatForYou.RotationOnly"),
            "both" : game.i18n.localize("CardTiles.Settings.MoveThatForYou.Both")
        }
    });
}