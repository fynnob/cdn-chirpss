window.RoleRegistry.Fox = {
    selection: [],
    
    renderUI: (context, me) => {
        if(me.foxLostPower) {
             return `<div class="text-center"><h2 class="text-red-400">Power Lost</h2><button class="btn btn-action mt-4" onclick="finishTurn()">Sleep</button></div>`;
        }

        window.RoleRegistry.Fox.selection = [];
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);

        return `
            <div class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2">🦊</div>
                <h2 class="text-3xl font-black text-orange-400 uppercase tracking-widest mb-1">Fox</h2>
                <p class="text-orange-300/50 text-xs font-bold uppercase tracking-widest mb-6">Select 3 players to sniff</p>
                
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${targets.map(p => 
                        `<button id="fox-${p.id}" onclick="window.RoleRegistry.Fox.toggle('${p.id}')" class="btn text-xs h-20 bg-orange-900/20 border-orange-500/30">${p.name}</button>`
                    ).join('')}
                </div>
                <button onclick="window.RoleRegistry.Fox.sniff()" class="btn btn-action">SNIFF</button>
            </div>`;
    },
    toggle: (id) => {
        const sel = window.RoleRegistry.Fox.selection;
        const btn = document.getElementById(`fox-${id}`);
        if(sel.includes(id)) {
            sel.splice(sel.indexOf(id), 1);
            btn.classList.remove('bg-orange-500');
        } else {
            if(sel.length >= 3) return;
            sel.push(id);
            btn.classList.add('bg-orange-500');
        }
    },
    sniff: () => {
        const sel = window.RoleRegistry.Fox.selection;
        if(sel.length < 1) return;
        
        const hasEvil = sel.some(id => {
            const p = GameContext.players.find(x => x.id === id);
            return p.team === 'Werewolf' || p.role === 'Serial Killer';
        });

        if(hasEvil) {
            alert("You smell something... EVIL is among them!");
            window.finishTurn(); // Keep power
        } else {
            alert("You smell nothing but innocence. You have lost your scent.");
            // Mark self as lost power (Engine handles logic or we pass flag)
            // Ideally, we pass { foxLostPower: true } and engine updates player state
            // For now, let's just finish. 
            // In a robust engine, we need to update GameContext.players
            const me = GameContext.players.find(p => p.role === 'Fox');
            me.foxLostPower = true; 
            window.finishTurn();
        }
    }
};
