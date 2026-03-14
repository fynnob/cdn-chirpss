window.RoleRegistry.Survivor = {
    renderUI: (context, me) => {
        if (!me.vests) me.vests = 2; // Default 2 vests

        return `
            <div class="text-center animate-fade-in bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black/60 backdrop-blur-2xl border-y border-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                <div class="inline-block text-6xl mb-2">🛡️</div>
                <h2 class="text-3xl font-black text-yellow-500 uppercase tracking-widest mb-1">Survivor</h2>
                <p class="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-70">Vests Remaining: ${me.vests}</p>
                
                ${me.vests > 0 ? 
                    `<button onclick="window.RoleRegistry.Survivor.useVest('${me.id}')" class="w-full py-4 bg-yellow-600 text-black font-bold rounded-xl mb-4">USE VEST</button>` 
                    : '<div class="text-red-500 mb-4 font-bold">No vests left</div>'}
                
                <button onclick="window.finishTurn()" class="w-full py-4 bg-white/5 text-gray-400 font-bold rounded-xl">Sleep</button>
            </div>`;
    },
    useVest: (id) => {
        const me = GameContext.players.find(p => p.id === id);
        me.vests--;
        // Treated like a Doctor save on self
        window.finishTurn({ doctorSave: id }); 
    }
};
