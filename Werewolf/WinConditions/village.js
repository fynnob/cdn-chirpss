window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf');
    const sk = alive.find(p => p.role === 'Serial Killer');
    const arsonist = alive.find(p => p.role === 'Arsonist');
    const whiteWolf = alive.find(p => p.role === 'White Werewolf');

    // Check for Mixed Lovers
    let mixedLoversAlive = false;
    if (context.links && context.links.length === 2) {
        const [id1, id2] = context.links;
        const p1 = alive.find(p => p.id === id1);
        const p2 = alive.find(p => p.id === id2);
        if (p1 && p2 && p1.team !== p2.team) mixedLoversAlive = true;
    }

    if (wolves.length === 0 && !sk && !arsonist && !whiteWolf && !mixedLoversAlive) {
        return {
            winner: 'Village',
            message: 'The Village is safe from all major threats.',
            color: 'text-green-400',
            priority: 10
        };
    }
    return null;
};
