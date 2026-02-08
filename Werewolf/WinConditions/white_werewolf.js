window.WinRegistry.WhiteWerewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const me = alive.find(p => p.role === 'White Werewolf');

    if (me && alive.length === 1) {
        return {
            winner: 'White Werewolf',
            message: 'The White Werewolf has betrayed everyone and stands alone.',
            color: 'text-gray-200',
            priority: 50
        };
    }
    return null;
};
