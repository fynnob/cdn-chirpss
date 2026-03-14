window.RoleRegistry.Knight = {
    renderUI: (context, me) => {
        // Knight acts every 2nd night? Or every night? 
        // Based on prompt: "Every 2nd night"
        if (context.turn % 2 !== 0) {
             return `<div class="text-center"><h2 class="text-gray-400">Resting tonight...</h2><button class="btn btn-action mt-4" onclick="finishTurn()">Sleep</button></div>`;
        }

        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2">⚔️</div>
                <h2 class="text-3xl font-black text-gray-200 uppercase tracking-widest mb-1">Knight</h2>
                <p class="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Challenge a player</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Knight.challenge('${p.id}')" class="btn bg-slate-700 hover:bg-slate-600">${p.name}</button>`
                    ).join('')}
                </div>
            </div>`;
    },
    challenge: (id) => {
        const target = GameContext.players.find(p => p.id === id);
        if(target.team === 'Werewolf' || target.role === 'Serial Killer') {
            // Target dies
            window.finishTurn({ knightKill: id });
        } else {
            // Nothing happens (or create a 'knightStunned' logic if you want penalty)
            alert("They are honorable. You sheathe your sword.");
            window.finishTurn();
        }
    }
};
