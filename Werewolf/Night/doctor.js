window.RoleRegistry.Doctor = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive);
        
        return `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">💊</div>
                <h2 class="text-3xl font-black text-blue-400 uppercase tracking-widest mb-1">Doctor</h2>
                <p class="text-blue-300/50 text-xs font-bold uppercase tracking-widest mb-6">Protect the Innocent</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ doctorSave: '${p.id}' })" class="btn bg-blue-900/40 border-blue-500/30 hover:bg-blue-600 hover:border-blue-400 shadow-lg shadow-blue-900/20">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};
