{
  "roles": {
    "Villager": {
      "name": "Villager",
      "team": "Village",
      "description": "Find the werewolves and vote them out.",
      "hasNightAction": false,
      "priority": 100
    },
    "Werewolf": {
      "name": "Werewolf",
      "team": "Werewolf",
      "description": "Kill a villager every night.",
      "hasNightAction": true,
      "script": "werewolf.js",
      "priority": 20
    },
    "Seer": {
      "name": "Seer",
      "team": "Village",
      "description": "See the true role of one player.",
      "hasNightAction": true,
      "script": "seer.js",
      "priority": 10
    },
    "Doctor": {
      "name": "Doctor",
      "team": "Village",
      "description": "Protect one player from being killed.",
      "hasNightAction": true,
      "script": "doctor.js",
      "priority": 30
    }
  }
}
