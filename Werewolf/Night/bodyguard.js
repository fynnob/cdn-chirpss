window.RoleRegistry.Bodyguard = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id); // Cannot self-guard usually
        return `
            <div class="text-center animate-fade-in">
                <h2 class="text-3xl font-black text-blue-500 mb-4">Bodyguard</h2>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => `<button onclick="window.finishTurn({ bodyguardSave: '${p.id}' })" class="btn bg-blue-900/40">${p.name}</button>`).join('')}
                </div>
            </div>`;
    }
};
