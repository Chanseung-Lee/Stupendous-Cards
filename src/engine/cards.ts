const guoba = {
    id: "guoba",
    name: "Guoba",
    cost: 0,
    kind: "minion",
    attack: 0,
    health: 2,
    abilities: [
        {
            trigger: "endOfTurn",
            run: (ctx) => {
                const target = ctx.randomEnemyMinion();
                if (target === undefined) return [];
                return [{ kind: "damage", targetId: target.id, amount: 1 }];
            },
        },
    ],
};

const xiangling = {
    id: "xiangling",
    name: "Xiangling",
    cost: 3,
    kind: "minion",
    attack: 3,
    health: 2,
    abilities: [
        {
            trigger: "battleCry",
            run: () => [{ kind: "summon", definitionId: "guoba" }],
        }
    ]
}