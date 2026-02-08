window.WinRegistry.Jester = (context) => {
    // Jester wins if the person who JUST died (lynched) was the Jester
    // context.lynchedId is passed from the Game engine during a vote
    if (context.lynchedId) {
        const victim = context.players.find(p => p.id === context.lynchedId);
        if (victim && victim.role === 'Jester') {
            return {
                winner: 'Jester',
                message: 'JESTER WINS! They tricked you into voting them out.',
                color: 'text-pink-500',
                priority: 100 // Highest priority (Game ends immediately)
            };
        }
    }
    return null;
};
