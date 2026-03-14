window.RoleRegistry.Werewolf = {
    renderUI: (context, me) => {
        // Werewolves can see other wolves (simple check)
        // In a pro version, we'd mark teammates differently.
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">🐺</div>
                <h2 class="text-3xl font-black text-red-500 uppercase tracking-widest mb-1">Werewolf</h2>
                <p class="text-red-900/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Devour the Village</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ wolfTarget: '${p.id}' })" class=" bg-red-950/40 backdrop-blur-md border border-red-900/50 text-red-100 hover:bg-red-900/60 hover:border-red-500 hover:text-white transition-all shadow-[inset_0_0_20px_rgba(255,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] py-4 rounded-xl font-bold uppercase tracking-wider text-sm relative overflow-hidden  py-4 text-sm hover:scale-[1.02]">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};
