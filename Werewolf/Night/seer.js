window.RoleRegistry.Seer = {
    renderUI: (context, me) => {
        // Seer can check anyone alive except self
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div id="seer-selection" class="animate-fade-in">
                <h2 class="text-4xl font-black text-purple-400 mb-2 uppercase tracking-widest">Seer</h2>
                <p class="mb-8 text-gray-400 font-bold">Gaze into a soul to reveal the truth.</p>
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Seer.reveal('${p.id}')" class="btn bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30">${p.name}</button>`
                    ).join('')}
                </div>
            </div>

            <div id="seer-result" class="hidden animate-fade-in bg-purple-900/20 p-8 rounded-2xl border border-purple-500/30">
                <h2 class="text-xl font-bold mb-6 text-purple-200">The fog clears...</h2>
                <h1 id="reveal-name" class="text-4xl font-black mb-2 text-white">...</h1>
                <p class="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">IS</p>
                <p id="reveal-role" class="text-3xl font-black text-yellow-400 mb-10">...</p>
                <button onclick="window.finishTurn()" class="btn btn-action">Close Eyes</button>
            </div>
        `;
    },
    
    reveal: (targetId) => {
        // We need to find the player in the DOM scope or passed context
        // Since 'GameContext' is global in Game.html, we can access it if needed,
        // but 'renderUI' passed 'context' which is cleaner, but 'reveal' is a callback.
        // We will assume GameContext is available globally for this callback.
        
        // Note: Ideally we pass the data in the onclick, but keeping it simple for MVP.
        const target = GameContext.players.find(p => p.id === targetId);
        
        document.getElementById('seer-selection').classList.add('hidden');
        document.getElementById('seer-result').classList.remove('hidden');
        
        document.getElementById('reveal-name').textContent = target.name;
        
        const isEvil = target.team === 'Werewolf';
        const roleText = isEvil ? "WEREWOLF (EVIL)" : "NOT WEREWOLF (GOOD)";
        const roleColor = isEvil ? "text-red-500" : "text-green-400";
        
        const roleEl = document.getElementById('reveal-role');
        roleEl.textContent = roleText;
        roleEl.className = `text-3xl font-black mb-10 ${roleColor}`;
    }
};
