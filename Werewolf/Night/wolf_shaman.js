window.RoleRegistry.WolfShaman = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.team !== 'Werewolf');
        return `
            <div class="text-center animate-fade-in">
                <h2 class="text-3xl font-black text-purple-400 mb-4">Wolf Shaman</h2>
                <p class="text-gray-400 text-xs mb-4">Choose a player to silence.</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ blockedId: '${p.id}' })" class="btn bg-purple-900/40">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
  