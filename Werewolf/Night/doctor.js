window.RoleRegistry.Doctor = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive);
        
        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">💊</div>
                <h2 class="text-3xl font-black text-blue-400 uppercase tracking-widest mb-1">Doctor</h2>
                <p class="text-blue-300/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Protect the Innocent</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ doctorSave: '${p.id}' })" class="btn bg-black/40 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_15px_rgba(255,255,255,0.05)] py-4 rounded-xl font-bold uppercase tracking-wider text-sm group relative overflow-hidden hover:scale-[1.02]">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};
