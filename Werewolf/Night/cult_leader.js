window.RoleRegistry.CultLeader = {
    renderUI: (context, me) => {
        // Can convert anyone not already in cult
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id && !context.cultIds.includes(p.id));
        return `
            <div class="text-center animate-fade-in bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <h2 class="text-3xl font-black text-yellow-600 mb-4">Cult Leader</h2>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ converted: '${p.id}' })" class="btn bg-yellow-900/30 active:scale-95 transition-transform ">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
