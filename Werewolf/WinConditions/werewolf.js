window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf').length;
    const goods = alive.filter(p => p.team === 'Village').length;
    const sk = alive.find(p => p.role === 'Serial Killer');

    // Wolves win if they outnumber village AND no Serial Killer exists
    if (wolves >= goods && !sk) {
        return {
            winner: 'Werewolf',
            message: 'The Werewolves have won! The village is overrun.',
            color: 'text-red-500',
            priority: 20
        };
    }
    return null;
};
