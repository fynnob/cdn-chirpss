window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    
    // 1. Check for active Werewolves
    const wolves = alive.filter(p => p.team === 'Werewolf');
    
    // 2. Check for Serial Killer
    const sk = alive.find(p => p.role === 'Serial Killer');

    // 3. Check for Alive Lovers
    // If context.links exists and contains IDs, check if any of those players are in the 'alive' list
    let loversAlive = false;
    if (context.links && context.links.length > 0) {
        loversAlive = alive.some(p => context.links.includes(p.id));
    }

    // Village Win Condition:
    // - No Werewolves alive
    // - No Serial Killer alive
    // - No Lovers alive
    // (Jester is ignored, so Village CAN win if Jester is the only one left with them)
    if (wolves.length === 0 && !sk && !loversAlive) {
        return {
            winner: 'Village',
            message: 'The Village has won! All threats (Wolves, SK, and Lovers) are gone.',
            color: 'text-green-400',
            priority: 10 // Checked last, so other wins take precedence
        };
    }
    return null;
};
