window.RoleRegistry.ApprenticeSeer = {
    renderUI: (context, me) => {
        // 'promoted' flag is set in Game.html startNightPhase if Seer is dead
        if (!me.promoted) {
            return `<div class="text-center"><h2 class="text-gray-400">Studying... (Waiting for Seer to die)</h2><button class="btn btn-action mt-4" onclick="finishTurn()">Sleep</button></div>`;
        }

        // Exact copy of Seer logic
        const targets = context.players.filter(p => p.isAlive && p.id !== me.id);
        return `
            <div id="seer-ui" class="text-center animate-fade-in">
                <div class="inline-block text-6xl mb-2">🎓</div>
                <h2 class="text-3xl font-black text-purple-400 uppercase tracking-widest mb-1">Seer (Promoted)</h2>
                <div class="grid grid-cols-2 gap-3 mt-4">
                    ${targets.map(p => `<button onclick="window.RoleRegistry.Seer.reveal('${p.id}')" class="btn bg-purple-900/40">${p.name}</button>`).join('')}
                </div>
            </div>
            <div id="seer-result" class="hidden text-center py-10">
                <h1 id="result-name" class="text-3xl font-black text-white mb-2"></h1>
                <div id="result-team" class="text-xl font-bold mb-8"></div>
                <button onclick="window.finishTurn()" class="w-full py-4 bg-white text-black font-bold rounded-xl">Close Eyes</button>
            </div>
        `;
    }
    // Note: This relies on Seer.reveal existing, or we must duplicate reveal logic here.
    // For safety, let's assume we need to duplicate it or ensure Seer script is loaded.
    // Better to just inline the reveal logic here again to be safe.
};
// Add reveal logic to Apprentice if needed similar to Seer.js
window.RoleRegistry.ApprenticeSeer.reveal = function(id) {
     /* Copy Seer Reveal Logic Here */
     const target = GameContext.players.find(p => p.id === id);
     document.getElementById('seer-ui').classList.add('hidden');
     document.getElementById('seer-result').classList.remove('hidden');
     document.getElementById('result-name').innerText = target.name;
     document.getElementById('result-team').innerText = (target.team === 'Werewolf' || target.role === 'Serial Killer') ? "EVIL" : "GOOD";
}
