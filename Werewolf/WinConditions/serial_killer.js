window.WinRegistry.SerialKiller = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const sk = alive.find(p => p.role === 'Serial Killer');

    // SK wins if they are the LAST one alive
    if (alive.length === 1 && sk) {
        return {
            winner: 'Serial Killer',
            message: 'The Serial Killer is the last one standing!',
            color: 'text-red-700',
            priority: 50 // High priority
        };
    }
    return null;
};
