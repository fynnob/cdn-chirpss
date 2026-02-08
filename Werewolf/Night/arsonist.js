window.RoleRegistry.Arsonist = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        const canIgnite = context.dousedIds.length > 0;
        
        return `
            <div class="text-center animate-fade-in">
                <h2 class="text-3xl font-black text-orange-500 mb-2">Arsonist</h2>
                <p class="text-gray-400 text-xs mb-4">Current Doused: ${context.dousedIds.length}</p>
                
                <div class="mb-6">
                    <h3 class="text-xs font-bold uppercase mb-2">Action 1: Douse</h3>
                    <div class="grid grid-cols-2 gap-2">
                        ${targets.map(p => `<button onclick="window.finishTurn({ doused: '${p.id}' })" class="btn bg-orange-900/30">${p.name}</button>`).join('')}
                    </div>
                </div>

                ${canIgnite ? `<button onclick="window.finishTurn({ ignite: true })" class="w-full py-4 bg-red-600 text-white font-bold rounded-xl animate-pulse">🔥 IGNITE ALL 🔥</button>` : ''}
            </div>`;
    }
};
