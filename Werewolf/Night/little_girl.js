window.RoleRegistry.LittleGirl = {
    renderUI: (context, me) => {
        return `
            <div id="girl-ui" class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2">👧</div>
                <h2 class="text-3xl font-black text-pink-300 uppercase tracking-widest mb-1">Little Girl</h2>
                <p class="text-pink-200/50 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Peek at the Werewolves?</p>
                
                <button onclick="window.RoleRegistry.LittleGirl.peek()" class="w-full py-4 bg-pink-600 text-white font-bold rounded-xl mb-2">PEEK (Risk Death)</button>
                <button onclick="window.finishTurn()" class="w-full py-4 bg-white/5 text-gray-400 font-bold rounded-xl">Sleep</button>
            </div>
            
            <div id="girl-result" class="hidden text-center">
                <h2 class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">You see...</h2>
                <div id="wolf-names" class="text-xl font-bold text-red-500 mb-8"></div>
                <button onclick="window.finishTurn({ littleGirlPeek: true })" class="w-full py-4 bg-white text-slate-900 font-bold rounded-xl">Hide</button>
            </div>
        `;
    },
    peek: () => {
        const wolves = GameContext.players.filter(p => p.team === 'Werewolf' && p.isAlive).map(p => p.name).join(', ');
        document.getElementById('girl-ui').classList.add('hidden');
        document.getElementById('girl-result').classList.remove('hidden');
        document.getElementById('wolf-names').innerText = wolves || "No Wolves found.";
    }
};
