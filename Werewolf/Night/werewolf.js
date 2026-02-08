window.RoleRegistry.Werewolf = {
    renderUI: (context, me) => {
        // Werewolves can see other wolves (simple check)
        // In a pro version, we'd mark teammates differently.
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">🐺</div>
                <h2 class="text-3xl font-black text-red-500 uppercase tracking-widest mb-1">Werewolf</h2>
                <p class="text-red-900/50 text-xs font-bold uppercase tracking-widest mb-6">Devour the Village</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.finishTurn({ wolfTarget: '${p.id}' })" class="btn btn-kill py-4 text-sm">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};
