window.RoleRegistry.Necromancer = {
    renderUI: (context, me) => {
        if(me.hasRevived) {
             return `<div class="text-center"><h2 class="text-gray-500">Power used.</h2><button class="btn btn-action mt-4" onclick="finishTurn()">Sleep</button></div>`;
        }

        // Find DEAD Werewolves
        const deadWolves = context.players.filter(p => !p.isAlive && p.team === 'Werewolf');
        
        if(deadWolves.length === 0) {
             return `<div class="text-center"><h2 class="text-gray-400">No dead wolves to revive.</h2><button class="btn btn-action mt-4" onclick="finishTurn()">Sleep</button></div>`;
        }

        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2">💀</div>
                <h2 class="text-3xl font-black text-green-700 uppercase tracking-widest mb-1">Necromancer</h2>
                <p class="text-green-800/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Revive a Brother</p>
                <div class="grid grid-cols-2 gap-2">
                    ${deadWolves.map(p => 
                        `<button onclick="window.RoleRegistry.Necromancer.revive('${p.id}')" class="btn bg-green-900/40 border-green-500/30">${p.name}</button>`
                    ).join('')}
                </div>
            </div>`;
    },
    revive: (id) => {
        // Mark power used
        const me = GameContext.players.find(p => p.role === 'Necromancer');
        me.hasRevived = true;
        window.finishTurn({ necromancerRevive: id });
    }
};
