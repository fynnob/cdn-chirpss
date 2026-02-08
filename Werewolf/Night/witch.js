window.RoleRegistry.Witch = {
    renderUI: (context, me) => {
        // 1. Get the Victim from the Werewolf turn (happened at Priority 10)
        const victimId = context.nightActions.wolfTarget;
        const victim = victimId ? context.players.find(p => p.id === victimId) : null;
        
        // 2. Filter targets for killing (Anyone alive except self)
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);

        let html = `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2 filter drop-shadow-lg">🧙‍♀️</div>
                <h2 class="text-3xl font-black text-purple-400 uppercase tracking-widest mb-1">The Witch</h2>
                <p class="text-purple-300/50 text-xs font-bold uppercase tracking-widest mb-6">Life and Death are in your hands</p>
            </div>
        `;

        // --- SECTION 1: HEALING POTION ---
        if (victim) {
            html += `
                <div class="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6">
                    <p class="text-red-400 font-bold text-xs uppercase tracking-widest mb-2">Werewolves attacked:</p>
                    <h3 class="text-3xl font-black text-white mb-4">${victim.name}</h3>
                    <div class="flex gap-2">
                        <button onclick="window.RoleRegistry.Witch.handleHeal()" class="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 uppercase tracking-widest text-sm">
                            ❤️ Save
                        </button>
                        <button onclick="document.getElementById('witch-kill-section').classList.remove('opacity-50', 'pointer-events-none'); this.parentElement.parentElement.style.opacity='0.5'; this.parentElement.parentElement.style.pointerEvents='none';" class="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-xl transition-all uppercase tracking-widest text-sm border border-white/10">
                            Pass
                        </button>
                    </div>
                </div>
            `;
        } else {
            html += `<div class="p-4 text-gray-500 italic text-sm text-center mb-6 border border-white/5 rounded-xl">No one was attacked tonight.</div>`;
        }

        // --- SECTION 2: POISON POTION ---
        // Initially dimmed if there is a victim to encourage "Save or Pass" decision first, 
        // but fully accessible if no victim.
        const dimClass = victim ? "opacity-50 pointer-events-none" : "";
        
        html += `
            <div id="witch-kill-section" class="border-t border-white/10 pt-6 transition-all duration-300 ${dimClass}">
                <p class="text-purple-400 font-bold text-xs uppercase tracking-widest mb-4 text-center">Use Poison Potion?</p>
                <div class="grid grid-cols-2 gap-2">
                    ${targets.map(p => 
                        `<button onclick="window.RoleRegistry.Witch.handleKill('${p.id}')" class="btn bg-purple-900/40 border-purple-500/30 hover:bg-purple-600 hover:border-purple-400 text-xs">${p.name}</button>`
                    ).join('')}
                </div>
                <button onclick="window.finishTurn()" class="w-full mt-4 py-3 bg-white/5 text-gray-500 font-bold rounded-xl hover:bg-white/10 uppercase tracking-widest text-xs">Do Nothing</button>
            </div>
        `;

        return html;
    },

    handleHeal: () => {
        // CLEAN LOGIC: We just tell the engine "Witch used heal".
        // The engine (Game.html) checks if (witchUsedHeal && wolfTarget) -> adds wolfTarget to protection set.
        window.finishTurn({ witchUsedHeal: true });
    },

    handleKill: (targetId) => {
        if(confirm("Are you sure you want to poison this player?")) {
            // CLEAN LOGIC: We tell the engine specifically who the Witch killed.
            // The engine adds this ID to the confirmedDeaths set.
            window.finishTurn({ witchKill: targetId });
        }
    }
};
