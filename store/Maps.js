export const Maps = [
    {
        id: '1',
        name: "Bois Rieur de Méga Wiggler",
        description: "Un bois mystérieux et vibrant, peuplé par les redoutables Wiggler géants.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-1.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-1.png'),
    },
    {
        id: '2',
        name: "Circuit Débridé",
        description: "Un circuit rapide et sinueux, idéal pour les courses effrénées.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-2.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-2.png'),
    },
    {
        id: '3',
        name: "Île Goomba",
        description: "Une île pleine de Goombas et d'obstacles, un vrai défi pour les aventuriers.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-3.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-3.png'),
    },
    {
        id: '4',
        name: "Base Secrète de Bowser",
        description: "La base secrète de Bowser, avec des pièges sournois et des ennemis redoutables.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-7.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-7.png'),
    },
    {
        id: '5',
        name: "Galeries Multicolores",
        description: "Un lieu magique aux couleurs vives, offrant un parcours fascinant et surprenant.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-4.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-4.png'),
    },
    {
        id: '6',
        name: "Pays Western",
        description: "Un environnement sauvage inspiré des classiques westerns, plein de duels et de défis.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-5.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-5.png'),
    },
    {
        id: '7',
        name: "Château Arc-en-Ciel de Mario",
        description: "Un château magique rempli de mystères et de couleurs éclatantes.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-6.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-6.png'),
    }
];

// fonction pour obtenir une carte aléatoire
export function getRandomMap() {
    const randomIndex = Math.floor(Math.random() * Maps.length);
    return Maps[randomIndex];
}

