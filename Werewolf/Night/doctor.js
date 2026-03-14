window.RoleRegistry.Doctor = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive);
        
        return `
            <div class="text-center animate-fade-in bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">💊</div>
                <h2 class="text-3xl font-black text-blue-400 uppercase tracking-widest mb-1">Doctor</h2>
                <p class="text-blue-300/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Protect the Innocent</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ doctorSave: '${p.id}' })" class="btn bg-black/40 backdrop-blur-md border border-white/10 text-white/90    transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]  py-4 rounded-xl font-bold uppercase tracking-wider text-sm group relative overflow-hidden  active:scale-95 transition-transform ">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};
