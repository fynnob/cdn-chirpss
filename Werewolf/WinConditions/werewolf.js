window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf').length;
    const total = alive.length;
    const nonWolves = total - wolves; 
    
    // Threats to the Pack
    const sk = alive.find(p => p.role === 'Serial Killer');
    const arsonist = alive.find(p => p.role === 'Arsonist');
    const whiteWolf = alive.find(p => p.role === 'White Werewolf');
    const cultLeader = alive.find(p => p.role === 'Cult Leader');
    
    // Win if:
    // 1. Pack exists (>0)
    // 2. Pack outnumbers rest
    // 3. No Solo Killers are alive
    if (wolves > 0 && wolves >= nonWolves && !sk && !arsonist && !whiteWolf && !cultLeader) {
        
        const survivor = alive.find(p => p.role === 'Survivor');
        let msg = 'The Werewolves have taken over the village.';
        if (survivor) msg += ' (The Survivor also wins!)';

        return {
            winner: 'Werewolf',
            message: msg,
            color: 'text-red-600',
            priority: 20
        };
    }
    return null;
};
