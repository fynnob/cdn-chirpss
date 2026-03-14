window.RoleRegistry.SerialKiller = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse grayscale">🔪</div>
                <h2 class="text-3xl font-black text-red-600 uppercase tracking-widest mb-1">Serial Killer</h2>
                <p class="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Everyone is a target</p>
                
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.SerialKiller.handle('${p.id}')" class="btn bg-red-950 border-red-900 text-red-200 hover:bg-red-900 shadow-lg">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    },
    handle: (targetId) => {
        // Serial Killer kill is usually unstoppable.
        // We pass 'skTarget' to distinguish it from wolf kills.
        window.finishTurn({ skTarget: targetId });
    }
};
