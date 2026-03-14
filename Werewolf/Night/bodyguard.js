window.RoleRegistry.Bodyguard = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id); // Cannot self-guard usually
        return `
            <div class="text-center animate-fade-in bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <h2 class="text-3xl font-black text-blue-500 mb-4">Bodyguard</h2>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ bodyguardSave: '${p.id}' })" class="btn bg-blue-900/40 active:scale-95 transition-transform ">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
