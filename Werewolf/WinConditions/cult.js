window.WinRegistry.Cult = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const leader = alive.find(p => p.role === 'Cult Leader');

    if (!leader) return null;

    // Check if every living player is either the Leader OR in the cult list
    const allConverted = alive.every(p => p.id === leader.id || context.cultIds.includes(p.id));

    if (allConverted) {
        return {
            winner: 'Cult',
            message: 'The Cult Leader has converted the entire village!',
            color: 'text-yellow-500',
            priority: 40
        };
    }
    return null;
};
