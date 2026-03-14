window.RoleRegistry.Bodyguard = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id); // Cannot self-guard usually
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <h2 class="text-3xl font-black text-blue-500 mb-4">Bodyguard</h2>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ bodyguardSave: '${p.id}' })" class="btn bg-blue-900/40">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
