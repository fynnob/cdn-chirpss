window.WinRegistry.Survivor = (context) => {
    // Survivor victory is auxiliary (they win WITH someone else).
    // They don't usually trigger the game end themselves.
    // However, if EVERYONE else is dead (e.g. Arsonist killed everyone but Survivor survives), 
    // Survivor wins alone.
    
    const alive = context.players.filter(p => p.isAlive);
    if(alive.length === 1 && alive[0].role === 'Survivor') {
        return {
            winner: 'Survivor',
            message: 'The Survivor is the last one standing!',
            color: 'text-yellow-500',
            priority: 60
        };
    }
    return null;
};
