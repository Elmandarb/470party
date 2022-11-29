export default {
    ball: {
        x: 20,
        y: 200,
        dx: 0,
        dy: 0,
        rad: 10,
        speed: 3
    },
    brick: {
        x: 0.5,
        y: 50,
        width: 900/10-1,
        height:20,
        density: 1,
        colors: ["red", "yellow"]
    },
    player: {
        name: "PlayerName",
        lives: 3,
        score: 0,
        level: 2,
        winScore: 250
    },
    paddleProps: {
        height: 30,
        width: 100,
        x:100,
        color: "red"
    }
};