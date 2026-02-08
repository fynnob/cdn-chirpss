window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf').length;
    const total = alive.length;
    const nonWolves = total - wolves; // Includes Villagers AND Neutrals (like Jester)
    
    const sk = alive.find(p => p.role === 'Serial Killer');

    // Win if:
    // 1. There is at least 1 wolf alive
    // 2. Wolves equal or outnumber everyone else
    // 3. No Serial Killer prevents the win
    if (wolves > 0 && wolves >= nonWolves && !sk) {
        return {
            winner: 'Werewolf',
            message: 'The Werewolves have won! The village is overrun.',
            color: 'text-red-500',
            priority: 20
        };
    }
    return null;
};
