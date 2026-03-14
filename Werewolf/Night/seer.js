window.RoleRegistry.Seer = {
    renderUI: (context, me) => {
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        
        return `
            <div id="seer-ui" class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">🔮</div>
                <h2 class="text-3xl font-black text-purple-400 uppercase tracking-widest mb-1">Seer</h2>
                <p class="text-indigo-300/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Reveal the Truth</p>
                
                <div class="grid grid-cols-2 gap-3">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Seer.reveal('${p.id}')" class="btn bg-black/40 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_15px_rgba(255,255,255,0.05)] py-4 rounded-xl font-bold uppercase tracking-wider text-sm group relative overflow-hidden hover:scale-[1.02]">${p.name}</button>`
                    ).join('')}
                </div>
            </div>

            <div id="seer-result" class="hidden text-center animate-fade-in py-10 bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
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
