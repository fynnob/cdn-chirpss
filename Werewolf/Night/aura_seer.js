window.RoleRegistry.AuraSeer = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div id="aura-ui" class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">✨</div>
                <h2 class="text-3xl font-black text-indigo-300 uppercase tracking-widest mb-1">Aura Seer</h2>
                <div class="grid grid-cols-2 gap-2 mt-6">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.AuraSeer.reveal('${p.id}')" class="btn bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-600">${p.name}</button>`
                    ).join('')}
                </div>
            </div>
            <div id="aura-result" class="hidden text-center py-10">
                <h2 class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">The Aura is...</h2>
                <h1 id="aura-text" class="text-4xl font-black text-white mb-6">...</h1>
                <button onclick="window.finishTurn()" class="w-full py-4 bg-white text-slate-900 font-bold rounded-xl">Close Eyes</button>
            </div>
        `;
    },
    reveal: (id) => {
        const p = GameContext.players.find(pl => pl.id === id);
        document.getElementById('aura-ui').classList.add('hidden');
        document.getElementById('aura-result').classList.remove('hidden');
        
        const txt = document.getElementById('aura-text');
        if(p.team === 'Werewolf' || p.role === 'Serial Killer') {
            txt.innerText = "EVIL / DARK";
            txt.className = "text-4xl font-black text-red-500 mb-6";
        } else if (p.team === 'Village') {
            txt.innerText = "GOOD / LIGHT";
            txt.className = "text-4xl font-black text-green-400 mb-6";
        } else {
            txt.innerText = "NEUTRAL / GREY";
            txt.className = "text-4xl font-black text-gray-400 mb-6";
        }
    }
};
