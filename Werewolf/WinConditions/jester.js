window.WinRegistry.Jester = (context) => {
    // Only triggers if a Lynch just happened
    if (context.lynchedId) {
        const victim = context.players.find(p => p.id === context.lynchedId);
        
        if (victim && victim.role === 'Jester') {
            return {
                winner: 'Jester',
                message: 'The Jester tricked you all! They win!',
                color: 'text-pink-500',
                priority: 100 // Highest priority, interrupts everything
            };
        }
    }
    return null;
};
