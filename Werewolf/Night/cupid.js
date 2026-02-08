window.RoleRegistry.Cupid = {
    selectedLovers: [],

    renderUI: (context, me) => {
        // Reset selection on render
        window.RoleRegistry.Cupid.selectedLovers = [];

        // Cupid only wakes up on Turn 1
        // (The engine increments turn, usually starts at 1)
        /* NOTE: Since the Engine calls scripts based on roles.json, 
           Cupid will wake up EVERY night unless we check here.
           If it's not Turn 1, we auto-skip.
        */
        if (context.turn > 1) {
            setTimeout(() => window.finishTurn(), 100);
            return `<div class="text-center mt-10 text-pink-400">Sleeping...</div>`;
        }

        const targets = context.players.filter(p => p.isAlive);

        return `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">💘</div>
                <h2 class="text-3xl font-black text-pink-400 uppercase tracking-widest mb-1">Cupid</h2>
                <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Choose two players to fall in love</p>
                
                <div class="grid grid-cols-2 gap-2 mb-6">
                    ${targets.map(p => 
                        `<button id="cupid-btn-${p.id}" onclick="window.RoleRegistry.Cupid.toggle('${p.id}')" class="btn border-pink-500/30 text-pink-100 hover:bg-pink-500/20">${p.name}</button>`
                    ).join('')}
                </div>

                <button onclick="window.RoleRegistry.Cupid.confirm()" class="w-full py-4 bg-pink-600 text-white font-black rounded-xl shadow-lg shadow-pink-900/50 hover:bg-pink-500 transition-all">
                    LINK LOVERS
                </button>
            </div>
        `;
    },

    toggle: (id) => {
        const list = window.RoleRegistry.Cupid.selectedLovers;
        const btn = document.getElementById(`cupid-btn-${id}`);

        if (list.includes(id)) {
            // Deselect
            list.splice(list.indexOf(id), 1);
            btn.classList.remove('bg-pink-500', 'text-white');
            btn.classList.add('border-pink-500/30');
        } else {
            // Select (Max 2)
            if (list.length >= 2) return; 
            list.push(id);
            btn.classList.add('bg-pink-500', 'text-white');
            btn.classList.remove('border-pink-500/30');
        }
    },

    confirm: () => {
        const list = window.RoleRegistry.Cupid.selectedLovers;
        if (list.length !== 2) return alert("You must choose exactly two lovers.");
        
        // Pass the lovers to the engine
        window.finishTurn({ lovers: list });
    }
};
