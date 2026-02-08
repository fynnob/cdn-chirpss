window.RoleRegistry.Werewolf = {
    renderUI: (context, me) => {
        // Targets: Alive players who are NOT me (in MVP, wolves can kill each other, but let's hide self)
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div class="animate-fade-in">
                <h2 class="text-4xl font-black text-red-500 mb-2 uppercase tracking-widest">Werewolf</h2>
                <p class="mb-8 text-gray-400 font-bold">Choose a victim to devour.</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Werewolf.handle('${p.id}')" class="btn btn-kill">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    },
    handle: (targetId) => {
        // finishTurn is global in Game.html
        window.finishTurn({ wolfTarget: targetId });
    }
};
