window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    
    // 1. Identify Threats
    const wolves = alive.filter(p => p.team === 'Werewolf'); // Includes Cub, Shaman, etc.
    const whiteWolf = alive.find(p => p.role === 'White Werewolf');
    const sk = alive.find(p => p.role === 'Serial Killer');
    const arsonist = alive.find(p => p.role === 'Arsonist');
    const cultLeader = alive.find(p => p.role === 'Cult Leader');

    // 2. Check for Alive Lovers (They form their own team)
    let loversAlive = false;
    if (context.links && context.links.length > 0) {
        loversAlive = alive.some(p => context.links.includes(p.id));
    }

    // 3. Win Condition: Zero threats remaining
    if (wolves.length === 0 && !whiteWolf && !sk && !arsonist && !cultLeader && !loversAlive) {
        
        // Bonus: Check if Survivor is alive to mention them
        const survivor = alive.find(p => p.role === 'Survivor');
        let msg = 'The Village has won! All threats are destroyed.';
        if (survivor) msg += ' (The Survivor also wins!)';

        return {
            winner: 'Village',
            message: msg,
            color: 'text-green-400',
            priority: 10
        };
    }
    return null;
};
