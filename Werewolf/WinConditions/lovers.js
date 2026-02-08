window.WinRegistry.Lovers = (context) => {
    const alive = context.players.filter(p => p.isAlive);
    
    // Check if exactly 2 people are alive
    if (alive.length === 2 && context.links && context.links.length === 2) {
        const [id1, id2] = context.links;
        
        // Check if the 2 alive people are the linked lovers
        const p1 = alive.find(p => p.id === id1);
        const p2 = alive.find(p => p.id === id2);

        if (p1 && p2) {
            return {
                winner: 'Lovers',
                message: 'Love Conquers All! The Lovers have won.',
                color: 'text-pink-400',
                priority: 60 // Overrides Village/Wolf wins
            };
        }
    }
    return null;
};
