window.RoleRegistry.Doctor = {
    renderUI: (context, me) => {
        // Doctor can save anyone alive (including self)
        const targets = context.players.filter(p => p.isAlive);
        
        return `
            <div class="animate-fade-in">
                <h2 class="text-4xl font-black text-blue-400 mb-2 uppercase tracking-widest">Doctor</h2>
                <p class="mb-8 text-gray-400 font-bold">Choose someone to protect.</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Doctor.handle('${p.id}')" class="btn bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    },
    handle: (targetId) => {
        window.finishTurn({ doctorSave: targetId });
    }
};
