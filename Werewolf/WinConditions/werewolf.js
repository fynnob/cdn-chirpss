window.WinRegistry.Werewolf = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    const wolves = alive.filter(p => p.team === 'Werewolf');
    const total = alive.length;

    // A White Wolf or Solo Killer stops a standard Pack victory
    const soloThreat = alive.find(p => 
        p.role === 'White Werewolf' || 
        p.role === 'Serial Killer' || 
        p.role === 'Arsonist'
    );

    // Wolves win if they outnumber everyone else AND no solo killers exist
    if (wolves.length > 0 && wolves.length >= (total - wolves.length) && !soloThreat) {
        return {
            winner: 'Werewolf',
            message: 'The pack has overrun the village.',
            color: 'text-red-500',
            priority: 20
        };
    }
    return null;
};
