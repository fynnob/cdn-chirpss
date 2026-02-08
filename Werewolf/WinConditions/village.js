window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    
    // Identify threats by Team/Role
    const enemies = alive.filter(p => {
        const isHarmless = p.role === 'Jester' || p.role === 'Survivor';
        return p.team !== 'Village' && !isHarmless;
    });

    // Check for mixed lovers
    let mixedLovers = false;
    if (context.links && context.links.length === 2) {
        const [id1, id2] = context.links;
        const p1 = alive.find(p => p.id === id1);
        const p2 = alive.find(p => p.id === id2);
        if (p1 && p2 && p1.team !== p2.team) mixedLovers = true;
    }

    // Village ONLY wins if there are 0 enemies and 0 mixed lovers
    if (enemies.length === 0 && !mixedLovers) {
        return {
            winner: 'Village',
            message: 'All threats eliminated. The Village is safe.',
            color: 'text-green-400',
            priority: 10 // Village always has the lowest priority
        };
    }
    return null;
};
