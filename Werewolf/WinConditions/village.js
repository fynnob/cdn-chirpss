window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    
    // 1. Find ANYONE who isn't on the Village team
    // We exclude the Jester and Survivor because they don't stop a Village win
    const enemies = alive.filter(p => {
        const isVillageTeam = p.team === 'Village';
        const isHarmlessNeutral = p.role === 'Jester' || p.role === 'Survivor';
        
        // If they aren't Village AND aren't a harmless neutral, they are a threat
        return !isVillageTeam && !isHarmlessNeutral;
    });

    // 2. Check for Mixed Lovers (Forbidden Love Stalemate)
    let mixedLoversAlive = false;
    if (context.links && context.links.length === 2) {
        const [id1, id2] = context.links;
        const p1 = alive.find(p => p.id === id1);
        const p2 = alive.find(p => p.id === id2);
        
        // If lovers are on different teams, Village cannot win yet
        if (p1 && p2 && p1.team !== p2.team) {
            mixedLoversAlive = true;
        }
    }

    // 3. Win Condition:
    // Village wins if there are NO enemies left and NO mixed-team lovers
    if (enemies.length === 0 && !mixedLoversAlive) {
        return {
            winner: 'Village',
            message: 'The Village is safe! All threats (including Cultists and Killers) are gone.',
            color: 'text-green-400',
            priority: 10
        };
    }
    return null;
};
