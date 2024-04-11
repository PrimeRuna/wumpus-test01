// screen w:160 x h:120
console.log("screen width:" + screen.width + ", height: " + screen.height);

let player: Player;
introGame();
startGame();
playGame();

// show splash screen
function introGame() {
    game.splash("Hunt the Wumpus", "Retro Arcade Edition");
}

// show start screen
function startGame() {
    let newName = game.askForString("Enter player name", 24);
    player = new Player(newName);
}

// show game screen
function playGame() {
    // set the game theme
    scene.setBackgroundColor(9);

    // set the games status info
    let goldCountSprite = createGoldCountSprite();
    forever(function () {
        goldCountSprite.setText(player.gold.toString());
    });

    // allow the player to move around the screen
    let playerSprite = createPlayerSprite();
    controller.moveSprite(playerSprite, 100, 100);

    // spawn new gold coins randomly on the screen every 2 seconds
    // and update player's gold coins
    let goldCoinSprite = createGoldCoinSprite();
    forever(function () {
        if (playerSprite.overlapsWith(goldCoinSprite)) {
            player.gold += 1;
            goldCoinSprite.startEffect(effects.coolRadial, 100);
            goldCoinSprite.setPosition(randint(20, 140), randint(20, 100));
        }
    });
    forever(function () {
        goldCoinSprite.setPosition(randint(20, 140), randint(20, 100));
        pause(2000);
    });
    
    // simulate the end game by pressing A for win and B for lose
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        endGame(true);
    });
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        endGame(false);
    });
}

// show end screen
function endGame(win: boolean) {
    let fx: effects.BackgroundEffect;
    if (win) {
        fx = effects.hearts;
    }
    else {
        fx = effects.dissolve;
    }
    game.over(win, fx);
}

function createGoldCoinSprite(): Sprite {
    let goldCoinImage = assets.image`goldCoin`;
    let goldCoinSprite: Sprite = null;
    goldCoinSprite = sprites.create(goldCoinImage, SpriteKind.Food);
    // let goldCoinSprite = sprites.create(img`
    //     . . b b b b . . 
    //     . b 5 5 5 5 b . 
    //     b 5 d 3 3 d 5 b 
    //     b 5 3 5 5 1 5 b 
    //     c 5 3 5 5 1 d c 
    //     c d d 1 1 d d c 
    //     . f d d d d f . 
    //     . . f f f f . . 
    //     `, SpriteKind.Food);
    return goldCoinSprite;
}

function createGoldCountSprite(): TextSprite {
    let goldCoinImage = assets.image`goldCoin`;
    let goldCountSprite = textsprite.create("0", 15, 1);
    goldCountSprite.setStayInScreen(true);
    goldCountSprite.setBorder(2, 6, 1);
    goldCountSprite.setIcon(goldCoinImage);
    goldCountSprite.setPosition(0, 120);
    return goldCountSprite;
}

function createPlayerSprite(): Sprite {
    let playerSprite = sprites.create(img`
            . . f f f . . . . . . . . f f f 
                . f f c c . . . . . . f c b b c 
                f f c c . . . . . . f c b b c . 
                f c f c . . . . . . f b c c c . 
                f f f c c . c c . f c b b c c . 
                f f c 3 c c 3 c c f b c b b c . 
                f f b 3 b c 3 b c f b c c b c . 
                . c b b b b b b c b b c c c . . 
                . c 1 b b b 1 b b c c c c . . . 
                c b b b b b b b b b c c . . . . 
                c b c b b b c b b b b f . . . . 
                f b 1 f f f 1 b b b b f c . . . 
                f b b b b b b b b b b f c c . . 
                . f b b b b b b b b c f . . . . 
                . . f b b b b b b c f . . . . . 
                . . . f f f f f f f . . . . . .
        `, SpriteKind.Player);
    playerSprite.setStayInScreen(true);
    return playerSprite;
}