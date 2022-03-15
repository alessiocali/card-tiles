import * as CardTilesConstants from "./constants.js"

Hooks.once('init', registerSettings);

async function registerSettings() {
    await registerScaling();
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
        filePicker: false
    });
}