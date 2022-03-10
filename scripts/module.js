Hooks.once('ready', async function() {
    registerDragDropHandler();
});

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

function onCanvasDrop(event) {
    event.preventDefault();

    let eventData = JSON.parse(event.dataTransfer.getData("text/plain"));
    if (eventData.type !== "Card") {
        canvas._dragDrop.callbacks.drop(event);
        return;
    }

    let globalPosition = canvas.stage.worldTransform.applyInverse({ x: event.x, y: event.y })

    let cardEventData = {
        cardCollectionId : eventData.cardsId,
        cardId : eventData.cardId,
        x : globalPosition.x,
        y : globalPosition.y
    }

    createCardTile(cardEventData);
}

function createCardTile(cardEventData) {
    let cardCollection = game.cards.get(cardEventData.cardCollectionId);
    let card = cardCollection.cards.get(cardEventData.cardId);
    
    let monkFlags = {
        "active" : true,
        "restriction" : "all",
        "controlled" : "all",
        "trigger" : "click",
        "pertoken" : false,
        "minrequired" : 0,
        "chance" : 100,
        "actions" : [ createCardCycleAction(card) ]
    };

    let width = card.data.width || 100;
    let height = card.data.height || 100;

    let cardTileData = {
        x : cardEventData.x - width / 2,
        y : cardEventData.y - height / 2,
        width : width,
        height : height,
        img : card.back.img,
        hidden : false,
        flags : { "monks-active-tiles" : monkFlags }
    };

    console.log(cardTileData)
    canvas.scene.createEmbeddedDocuments("Tile", [ cardTileData ]);
}

function createCardCycleAction(card) {
    return {
        "action" : "imagecycle",
        "data" : {
            "entity" : "",
            "imgat" : 1,
            "files" : buildFacesFiles(card)
        },
        "_file-list": "",
        "id": randomID(16)
    }
}

function buildFacesFiles(card) {
    let allFaces = [ card.back, card.data.faces ].flat();
    return allFaces.map( face => { return { "id" : randomID(16), "name" : face.img  } } );
}