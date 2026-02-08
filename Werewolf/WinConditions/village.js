window.WinRegistry.Village = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf');
    const sk = alive.find(p => p.role === 'Serial Killer');

    // Village wins if no Wolves AND no Serial Killer remain
    if (wolves.length === 0 && !sk) {
        return {
            winner: 'Village',
            message: 'The Village has won! All evil has been vanquished.',
            color: 'text-green-400',
            priority: 10 // Low priority (checked last)
        };
    }
    return null;
};
