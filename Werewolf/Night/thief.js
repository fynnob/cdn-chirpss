window.RoleRegistry.Thief = {
    renderUI: (context, me) => {
        // Thief only acts on Turn 1
        if(context.turn > 1) {
            setTimeout(() => window.finishTurn(), 100);
            return `<div class="text-center">Thief sleeps...</div>`;
        }

        const targets = context.players.filter(p => p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div class="inline-block text-6xl mb-2">💰</div>
                <h2 class="text-3xl font-black text-gray-400 uppercase tracking-widest mb-1">Thief</h2>
                <p class="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Steal a role (Night 1 Only)</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ thiefSwap: '${p.id}' })" class="btn bg-gray-800 border-gray-600  active:scale-95 transition-transform ">${p.name}</button>`
                    ).join('')}
                </div>
            </div>`;
    }
};
