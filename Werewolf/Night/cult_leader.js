window.RoleRegistry.CultLeader = {
    renderUI: (context, me) => {
        // Can convert anyone not already in cult
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id && !context.cultIds.includes(p.id));
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <h2 class="text-3xl font-black text-yellow-600 mb-4">Cult Leader</h2>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ converted: '${p.id}' })" class="btn bg-yellow-900/30">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
