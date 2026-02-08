window.RoleRegistry.Seer = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div id="seer-ui" class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">🔮</div>
                <h2 class="text-3xl font-black text-purple-400 uppercase tracking-widest mb-1">Seer</h2>
                <p class="text-indigo-300/50 text-xs font-bold uppercase tracking-widest mb-6">Reveal the Truth</p>
                
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Seer.reveal('${p.id}')" class="btn bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-600 hover:border-indigo-400 shadow-lg shadow-indigo-900/20">${p.name}</button>`
                    ).join('')}
                </div>
            </div>

            <div id="seer-result" class="hidden text-center animate-fade-in py-10">
                <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <span id="result-icon" class="text-5xl"></span>
                </div>
                <h2 class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">The aura reveals...</h2>
                <h1 id="result-name" class="text-3xl font-black text-white mb-2"></h1>
                <div id="result-team" class="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/10 mb-8"></div>
                
                <button onclick="window.finishTurn()" class="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-200">Close Eyes</button>
            </div>
        `;
    },
    
    reveal: (targetId) => {
        const target = GameContext.players.find(p => p.id === targetId);
        
        document.getElementById('seer-ui').classList.add('hidden');
        document.getElementById('seer-result').classList.remove('hidden');
        
        document.getElementById('result-name').innerText = target.name;
        
        const isEvil = target.team === 'Werewolf' || target.role === 'Serial Killer';
        const teamEl = document.getElementById('result-team');
        const iconEl = document.getElementById('result-icon');

        if(isEvil) {
            teamEl.innerText = "EVIL / THREAT";
            teamEl.className = "inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30";
            iconEl.innerText = "👹";
        } else {
            teamEl.innerText = "GOOD / VILLAGER";
            teamEl.className = "inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-green-500/20 text-green-400 border border-green-500/30";
            iconEl.innerText = "🕊️";
        }
    }
};
