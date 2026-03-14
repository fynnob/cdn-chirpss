window.RoleRegistry.Priest = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">✝️</div>
                <h2 class="text-3xl font-black text-blue-200 uppercase tracking-widest mb-1">Priest</h2>
                <p class="text-blue-200/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Bless a player (Protects vs Wolves)</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ priestSave: '${p.id}' })" class="btn bg-blue-900/40 border-blue-500/30  active:scale-95 transition-transform ">${p.name}</button>`
                    ).join('')}
                </div>
            </div>`;
    }
};
