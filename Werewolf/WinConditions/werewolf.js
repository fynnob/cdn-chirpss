window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf').length;
    const total = alive.length;
    const nonWolves = total - wolves; 
    
    const sk = alive.find(p => p.role === 'Serial Killer');
    const arsonist = alive.find(p => p.role === 'Arsonist');
    const whiteWolf = alive.find(p => p.role === 'White Werewolf');
    const cultLeader = alive.find(p => p.role === 'Cult Leader');

    // NEW: Check for "Forbidden Love" (Mixed-Team Lovers)
    let mixedLoversAlive = false;
    if (context.links && context.links.length === 2) {
        const [id1, id2] = context.links;
        const p1 = alive.find(p => p.id === id1);
        const p2 = alive.find(p => p.id === id2);
        
        // If both lovers are alive and they are on DIFFERENT teams, it's a stalemate for the pack
        if (p1 && p2 && p1.team !== p2.team) {
            mixedLoversAlive = true;
        }
    }

    // Win if:
    // 1. Pack exists
    // 2. Pack outnumbers rest
    // 3. No Solo Killers
    // 4. NO Mixed Lovers (They must be dealt with first!)
    if (wolves > 0 && wolves >= nonWolves && !sk && !arsonist && !whiteWolf && !cultLeader && !mixedLoversAlive) {
        return {
            winner: 'Werewolf',
            message: 'The Werewolves have overrun the village.',
            color: 'text-red-600',
            priority: 20
        };
    }
    return null;
};
