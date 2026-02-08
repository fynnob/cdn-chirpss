window.WinRegistry.Arsonist = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const me = alive.find(p => p.role === 'Arsonist');

    // Arsonist only wins if they are ALIVE and the ONLY one alive
    if (me && alive.length === 1) {
        return {
            winner: 'Arsonist',
            message: 'The village is nothing but ash and embers.',
            color: 'text-orange-500',
            priority: 50 // High priority to beat Village/Wolf checks
        };
    }
    return null;
};
