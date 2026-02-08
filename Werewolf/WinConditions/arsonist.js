window.WinRegistry.Arsonist = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const me = alive.find(p => p.role === 'Arsonist');

    if (me && alive.length === 1) {
        return {
            winner: 'Arsonist',
            message: 'The Arsonist has burned the village to ash.',
            color: 'text-orange-500',
            priority: 50
        };
    }
    return null;
};
