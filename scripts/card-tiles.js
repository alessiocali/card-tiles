import * as CardTilesConstants from "./constants.js"

Hooks.once('ready', registerDragDropHandler);

function registerDragDropHandler() {
    let dragDropConfig = {
        callbacks: {
            drop: onCanvasDrop
        }
    };

    // Is there a better way than binding to the board? This will prevent any other module from intercepting drag n drop
    let board = document.getElementById("board");
    new DragDrop(dragDropConfig).bind(board);
}

async function onCanvasDrop(event) {
    event.preventDefault();

    const eventData = JSON.parse(event.dataTransfer.getData("text/plain"));
    if (eventData.type !== "Card") {
        canvas._dragDrop.callbacks.drop(event);
        return;
    }

    const globalPosition = canvas.stage.worldTransform.applyInverse({ x: event.x, y: event.y })

    const cardCollection = game.cards.get(eventData.cardsId);
    const card = cardCollection.cards.get(eventData.cardId);
    const cardEventData = {
        cardCollection : cardCollection,
        card : card,
        x : globalPosition.x,
        y : globalPosition.y
    }

    const shouldPassToBoard = !isBoardStack(cardCollection) && game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.PASS_CARDS_TO_BOARD_STACK);
    const isDrawnFromDeck = card.data.drawn && cardCollection.data.type === "deck";
    const dontDrawFromDeck = game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEAL_AFTER_DRAWN_FROM_DECK_NAME) === false;
    if (dontDrawFromDeck && isDrawnFromDeck) {
        ui.notifications.warn(game.i18n.localize("CardTiles.Notifications.Warnings.CardAlreadyDrawn"));
    }
    else if (shouldPassToBoard && !isDrawnFromDeck) {
        await createCardTile(cardEventData);
        await moveCardToBoardStack(cardEventData);
    }
    else {
        await createCardTile(cardEventData);
    }
}

function isBoardStack(cardCollection) {
    const boardStack = tryGetBoardStack();
    return boardStack !== undefined && boardStack === cardCollection;
}

async function createCardTile(cardEventData) {
    const card = cardEventData.card;
    const cardCollection = cardEventData.cardCollection;

    // Back face is null rather than 0.
    const faceIdx = card.data.face == null ? 0 : card.data.face + 1;    
    const monkFlags = {
        "active" : true,
        "restriction" : "all",
        "controlled" : "all",
        "trigger" : "click",
        "pertoken" : false,
        "minrequired" : 0,
        "chance" : 100,
        "actions" : [ createCardCycleAction(card) ],
        "files" : buildFacesFiles(card),
        "fileindex" : faceIdx
    };

    const scaling = game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.SCALING_NAME) || 1.0;
    const width = (card.data.width || getDefaultWidth(cardCollection)) * scaling;
    const height = (card.data.height || getDefaultHeight(cardCollection)) * scaling;

    const cardTileData = {
        x : cardEventData.x - width / 2,
        y : cardEventData.y - height / 2,
        width : width,
        height : height,
        img : card.face?.img || card.back.img,
        hidden : false,
        flags : { "monks-active-tiles" : monkFlags }
    };

    await canvas.scene.createEmbeddedDocuments("Tile", [ cardTileData ]);
}

function createCardCycleAction(card) {
    return {
        "action" : "tileimage",
        "data" : {
            "entity" : "",
            "select" : "next",
            "transition" : "none"
        },
        "id": randomID(16)
    }
}

function buildFacesFiles(card) {
    const allFaces = [ card.back, card.data.faces ].flat();
    return allFaces.map( face => { return { "id" : randomID(16), "name" : face.img, "selected" : false  } } );
}

function getDefaultWidth(cardCollection) {
    return cardCollection.data.width || game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEFAULT_WIDTH_NAME) || 100;
}

function getDefaultHeight(cardCollection) {
    return cardCollection.data.heigh || game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.DEFAULT_HEIGHT_NAME) || 100;
}

async function moveCardToBoardStack(cardEventData) {
    const cardCollection = cardEventData.cardCollection;
    const destination = await getOrCreateBoardStack();
    cardCollection.pass(destination, [cardEventData.card.id]);
}

async function getOrCreateBoardStack() {
    return tryGetBoardStack() || await createAndSetDefaultBoardStack();
}

function tryGetBoardStack() {
    const destinationId = game.settings.get(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.BOARD_STACK_NAME);
    return game.cards.has(destinationId) ? game.cards.get(destinationId) : undefined;
}

async function createAndSetDefaultBoardStack() {
    const newStackData = {
        name: game.i18n.localize("CardTiles.General.DefaulBoardStackName"),
        type: "pile"
    };

    const createdDocuments = await Cards.createDocuments([newStackData]);
    const newStack = createdDocuments[0];
    game.settings.set(CardTilesConstants.MODULE_NAME, CardTilesConstants.Settings.BOARD_STACK_NAME, newStack.id);
    return newStack;
}