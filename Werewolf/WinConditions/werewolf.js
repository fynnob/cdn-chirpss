window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf').length;
    const total = alive.length;
    const nonWolves = total - wolves; 

    // THREATS: These roles stop a Werewolf victory
    const whiteWolf = alive.find(p => p.role === 'White Werewolf');
    const sk = alive.find(p => p.role === 'Serial Killer');
    const arsonist = alive.find(p => p.role === 'Arsonist');
    const cultLeader = alive.find(p => p.role === 'Cult Leader');

    // 1. If a White Werewolf is alive, the pack cannot win (The traitor is still among them)
    if (whiteWolf) return null;

    // 2. Standard Win: Wolves >= Everyone else, and no solo killers/cults
    if (wolves > 0 && wolves >= nonWolves && !sk && !arsonist && !cultLeader) {
        return {
            winner: 'Werewolf',
            message: 'The pack has overrun the village.',
            color: 'text-red-500',
            priority: 20
        };
    }
    return null;
};
