window.RoleRegistry.WhiteWerewolf = {
    renderUI: (context, me) => {
        // Only active every 2nd night (turn 2, 4, 6...)
        if (context.turn % 2 !== 0) {
            setTimeout(() => window.finishTurn(), 1000);
            return `<div class="text-center">Biding time...</div>`;
        }
        
        // Target: Other Wolves
        const targets = context.players.filter(p => p.isAlive && p.team === 'Werewolf' && p.id !== me.id);
        
        if(targets.length === 0) return `<div class="text-center">No other wolves left. <button class="btn" onclick="finishTurn()">Sleep</button></div>`;

        return `
            <div class="text-center animate-fade-in">
                <h2 class="text-3xl font-black text-gray-200 mb-4">White Werewolf</h2>
                <p class="text-xs mb-4">Eliminate the pack.</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ whiteWolfKill: '${p.id}' })" class="btn bg-gray-700">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
