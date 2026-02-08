window.RoleRegistry.Priest = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">✝️</div>
                <h2 class="text-3xl font-black text-blue-200 uppercase tracking-widest mb-1">Priest</h2>
                <p class="text-blue-200/50 text-xs font-bold uppercase tracking-widest mb-6">Bless a player (Protects vs Wolves)</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ priestSave: '${p.id}' })" class="btn bg-blue-900/40 border-blue-500/30 hover:bg-blue-600">${p.name}</button>`
                    ).join('')}
                </div>
            </div>`;
    }
};
