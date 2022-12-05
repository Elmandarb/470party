export default {
    gameStuff: {
        players: 1,
        turn: 0,
        roll: false,
        inGame: false,

    },
    player1: {
        name : 'player 1',
        position : 0,
        score : 50,
        place : 1,
        color: 'red',
        turnOrder : 0
    },
    player2: {
        name : 'player 2',
        position : 0,
        score : 500,
        place : 2,
        color: 'cyan',
        turnOrder : 1
    },
    player3: {
        name : 'player 3',
        position : 0,
        score : 37,
        place : 3,
        color: 'green',
        turnOrder : 2
    },
    player4: {
        name : 'player 4',
        position : 0,
        score : 14,
        place : 4,
        color: 'yellow',
        turnOrder : 3
    },
    games : {
        singleGames: ['Breakout', 'Tetris','Baseball','Connect Four','snake'],
        multiGames: ['Flappy','Pong', 'PuzzlerTwo','Puzzler2']
    }
}