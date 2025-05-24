import { Profession } from "../CharacterBuilder";

// This is a simplified version of the SWG profession data
// In a full implementation, this would be much more comprehensive
export const professionData: Profession[] = [
  {
    id: "brawler",
    name: "Brawler",
    description: "A profession focused on hand-to-hand combat skills.",
    type: "basic",
    noviceBox: {
      id: "brawler_novice",
      name: "Novice Brawler",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["berserk_1", "center_of_being", "taunt", "intimidate_1"],
        certifications: ["dagger_certification", "one_hand_lunge_1", "polearm_lunge_1", "two_hand_lunge_1", "unarmed_lunge_1"],
        modifiers: {
          "unarmed_damage": 15,
          "unarmed_speed": 5,
          "unarmed_accuracy": 10,
          "unarmed_center_of_being_duration": 5,
          "unarmed_center_of_being_efficacy": 10,
          "one_handed_weapon_speed": 5,
          "one_handed_weapon_accuracy": 10,
          "one_handed_center_of_being_duration": 5,
          "one_handed_melee_center_of_being_efficacy": 10,
          "two_handed_melee_speed": 5,
          "two_handed_melee_accuracy": 10,
          "two_handed_melee_center_of_being": 5,
          "two_handed_melee_center_of_being_efficacy": 10,
          "polearm_speed": 5,
          "polearm_accuracy": 10,
          "polearm_center_of_being_duration": 5,
          "polearm_center_of_being_efficacy": 10,
          "taunt": 10,
          "private_unarmed_combat_difficulty": 100,
          "private_onehandmelee_combat_difficulty": 100,
          "private_twohandmelee_combat_difficulty": 100,
          "private_polearm_combat_difficulty": 100
        }
      }
    },
    masterBox: {
      id: "brawler_master",
      name: "Master Brawler",
      skillPoints: 15,
      xpCost: 10000,
      prerequisites: [
        "brawler_unarmed_4",
        "brawler_1hand_4",
        "brawler_2hand_4",
        "brawler_polearm_4"
      ],
      grants: {
        commands: ["berserk_2", "warcry_2"],
        modifiers: {
          "unarmed_damage": 25,
          "unarmed_speed": 10,
          "unarmed_accuracy": 20,
          "one_handed_weapon_speed": 10,
          "one_handed_weapon_accuracy": 20,
          "two_handed_melee_speed": 10,
          "two_handed_melee_accuracy": 20,
          "polearm_speed": 10,
          "polearm_accuracy": 20,
          "taunt": 20
        }
      }
    },
    skillTrees: {
      unarmed: {
        name: "Unarmed Combat",
        boxes: [
          {
            id: "brawler_unarmed_1",
            name: "Unarmed I: Street Fighting",
            skillPoints: 15,
            xpCost: 2000,
            prerequisites: ["brawler_novice"],
            grants: {
              commands: ["warcry_1"],
              modifiers: {
                "unarmed_damage": 10,
                "unarmed_speed": 5,
                "unarmed_accuracy": 5
              }
            }
          },
          {
            id: "brawler_unarmed_2",
            name: "Unarmed II: Stunning Attack",
            skillPoints: 15,
            xpCost: 3000,
            prerequisites: ["brawler_unarmed_1"],
            grants: {
              commands: ["unarmed_stun_1"],
              modifiers: {
                "unarmed_damage": 15,
                "unarmed_speed": 8,
                "unarmed_accuracy": 10
              }
            }
          },
          {
            id: "brawler_unarmed_3",
            name: "Unarmed III: Blinding Attack",
            skillPoints: 15,
            xpCost: 4000,
            prerequisites: ["brawler_unarmed_2"],
            grants: {
              commands: ["unarmed_blind_1"],
              modifiers: {
                "unarmed_damage": 20,
                "unarmed_speed": 10,
                "unarmed_accuracy": 15
              }
            }
          },
          {
            id: "brawler_unarmed_4",
            name: "Unarmed IV: Teras Kasi Fundamentals",
            skillPoints: 15,
            xpCost: 5000,
            prerequisites: ["brawler_unarmed_3"],
            grants: {
              commands: ["unarmed_dizzy_1"],
              modifiers: {
                "unarmed_damage": 25,
                "unarmed_speed": 15,
                "unarmed_accuracy": 20
              }
            }
          }
        ]
      },
      onehand: {
        name: "One-Handed Combat",
        boxes: [
          {
            id: "brawler_1hand_1",
            name: "One-Handed I: Sword Technique",
            skillPoints: 15,
            xpCost: 2000,
            prerequisites: ["brawler_novice"],
            grants: {
              certifications: ["one_handed_sword_certification"],
              modifiers: {
                "one_handed_weapon_speed": 5,
                "one_handed_weapon_accuracy": 5
              }
            }
          },
          {
            id: "brawler_1hand_2",
            name: "One-Handed II: Lethal Strikes",
            skillPoints: 15,
            xpCost: 3000,
            prerequisites: ["brawler_1hand_1"],
            grants: {
              commands: ["one_hand_strike_1"],
              modifiers: {
                "one_handed_weapon_speed": 8,
                "one_handed_weapon_accuracy": 10
              }
            }
          },
          {
            id: "brawler_1hand_3",
            name: "One-Handed III: Blunt Edge Strikes",
            skillPoints: 15,
            xpCost: 4000,
            prerequisites: ["brawler_1hand_2"],
            grants: {
              certifications: ["one_handed_axe_certification"],
              modifiers: {
                "one_handed_weapon_speed": 10,
                "one_handed_weapon_accuracy": 15
              }
            }
          },
          {
            id: "brawler_1hand_4",
            name: "One-Handed IV: Dance of Blades",
            skillPoints: 15,
            xpCost: 5000,
            prerequisites: ["brawler_1hand_3"],
            grants: {
              commands: ["one_hand_dervish_1"],
              modifiers: {
                "one_handed_weapon_speed": 15,
                "one_handed_weapon_accuracy": 20
              }
            }
          }
        ]
      },
      twohand: {
        name: "Two-Handed Combat",
        boxes: [
          {
            id: "brawler_2hand_1",
            name: "Two-Handed I: Weighted Stances",
            skillPoints: 15,
            xpCost: 2000,
            prerequisites: ["brawler_novice"],
            grants: {
              certifications: ["two_handed_sword_certification"],
              modifiers: {
                "two_handed_melee_speed": 5,
                "two_handed_melee_accuracy": 5
              }
            }
          },
          {
            id: "brawler_2hand_2",
            name: "Two-Handed II: Strength & Precision",
            skillPoints: 15,
            xpCost: 3000,
            prerequisites: ["brawler_2hand_1"],
            grants: {
              commands: ["two_hand_cleave_1"],
              modifiers: {
                "two_handed_melee_speed": 8,
                "two_handed_melee_accuracy": 10
              }
            }
          },
          {
            id: "brawler_2hand_3",
            name: "Two-Handed III: Sweeps",
            skillPoints: 15,
            xpCost: 4000,
            prerequisites: ["brawler_2hand_2"],
            grants: {
              certifications: ["two_handed_axe_certification"],
              modifiers: {
                "two_handed_melee_speed": 10,
                "two_handed_melee_accuracy": 15
              }
            }
          },
          {
            id: "brawler_2hand_4",
            name: "Two-Handed IV: Fatal Finesse",
            skillPoints: 15,
            xpCost: 5000,
            prerequisites: ["brawler_2hand_3"],
            grants: {
              commands: ["two_hand_spin_1"],
              modifiers: {
                "two_handed_melee_speed": 15,
                "two_handed_melee_accuracy": 20
              }
            }
          }
        ]
      },
      polearm: {
        name: "Polearm Combat",
        boxes: [
          {
            id: "brawler_polearm_1",
            name: "Polearms I: Long Hafted Weaponry",
            skillPoints: 15,
            xpCost: 2000,
            prerequisites: ["brawler_novice"],
            grants: {
              certifications: ["polearm_certification"],
              modifiers: {
                "polearm_speed": 5,
                "polearm_accuracy": 5
              }
            }
          },
          {
            id: "brawler_polearm_2",
            name: "Polearms II: Form & Balance",
            skillPoints: 15,
            xpCost: 3000,
            prerequisites: ["brawler_polearm_1"],
            grants: {
              commands: ["polearm_jab_1"],
              modifiers: {
                "polearm_speed": 8,
                "polearm_accuracy": 10
              }
            }
          },
          {
            id: "brawler_polearm_3",
            name: "Polearms III: Power Strikes",
            skillPoints: 15,
            xpCost: 4000,
            prerequisites: ["brawler_polearm_2"],
            grants: {
              certifications: ["lance_certification"],
              modifiers: {
                "polearm_speed": 10,
                "polearm_accuracy": 15
              }
            }
          },
          {
            id: "brawler_polearm_4",
            name: "Polearms IV: Overwhelming Assault",
            skillPoints: 15,
            xpCost: 5000,
            prerequisites: ["brawler_polearm_3"],
            grants: {
              commands: ["polearm_sweep_1"],
              modifiers: {
                "polearm_speed": 15,
                "polearm_accuracy": 20
              }
            }
          }
        ]
      }
    },
    leadsTo: {
      "teras_kasi_artist": "brawler_unarmed_4",
      "smuggler": "brawler_unarmed_2",
      "commando": "brawler_unarmed_2",
      "fencer": "brawler_1hand_4",
      "swordsman": "brawler_2hand_4",
      "pikeman": "brawler_polearm_4"
    }
  },
  {
    id: "marksman",
    name: "Marksman",
    description: "A profession specializing in ranged weapons and tactics.",
    type: "basic",
    noviceBox: {
      id: "marksman_novice",
      name: "Novice Marksman",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["overcharge_shot_1", "take_cover"],
        certifications: ["pistol_certification", "rifle_certification", "carbine_certification"],
        modifiers: {
          "ranged_defense": 5,
          "pistol_accuracy": 10,
          "pistol_speed": 5,
          "rifle_accuracy": 10,
          "rifle_speed": 5,
          "carbine_accuracy": 10,
          "carbine_speed": 5
        }
      }
    },
    skillTrees: {
      pistols: {
        name: "Pistols",
        boxes: [
          {
            id: "marksman_pistol_1",
            name: "Pistols I: Handgun Training",
            skillPoints: 15,
            xpCost: 2000,
            prerequisites: ["marksman_novice"],
            grants: {
              commands: ["pistol_body_shot_1"],
              modifiers: {
                "pistol_accuracy": 15,
                "pistol_speed": 10
              }
            }
          }
        ]
      }
    }
  },
  {
    id: "medic",
    name: "Medic",
    description: "Specializes in healing injuries and wounds.",
    type: "basic",
    noviceBox: {
      id: "medic_novice",
      name: "Novice Medic",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["diagnose", "heal_wounds_1"],
        certifications: ["medical_certification_1"],
        modifiers: {
          "healing_wound_treatment": 10,
          "healing_wound_speed": 5
        }
      }
    },
    skillTrees: {}
  },
  {
    id: "artisan",
    name: "Artisan",
    description: "Crafters who create useful items from raw materials.",
    type: "basic",
    noviceBox: {
      id: "artisan_novice",
      name: "Novice Artisan",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["craft", "survey"],
        certifications: ["crafting_clothing_novice", "crafting_food_novice", "crafting_structure_novice"],
        modifiers: {
          "crafting_assembly": 10,
          "crafting_experimentation": 5
        }
      }
    },
    skillTrees: {}
  },
  {
    id: "entertainer",
    name: "Entertainer",
    description: "Provides entertainment and inspiration through music and dance.",
    type: "basic",
    noviceBox: {
      id: "entertainer_novice",
      name: "Novice Entertainer",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["flourish", "startmusic", "startdance"],
        modifiers: {
          "entertainer_dance": 10,
          "entertainer_music": 10,
          "healing_dance_mind": 5,
          "healing_music_mind": 5
        }
      }
    },
    skillTrees: {}
  },
  {
    id: "scout",
    name: "Scout",
    description: "Wilderness experts who excel at exploration and tracking.",
    type: "basic",
    noviceBox: {
      id: "scout_novice",
      name: "Novice Scout",
      skillPoints: 15,
      xpCost: 1000,
      prerequisites: [],
      grants: {
        commands: ["forage", "mask_scent", "harvest"],
        modifiers: {
          "camouflage": 10,
          "creature_harvesting": 15,
          "creature_knowledge": 10
        }
      }
    },
    skillTrees: {}
  },
  {
    id: "jedi",
    name: "Jedi",
    description: "Force-sensitive individuals trained in the ways of the Jedi.",
    type: "force",
    noviceBox: {
      id: "jedi_novice",
      name: "Novice Jedi",
      skillPoints: 25,
      xpCost: 10000,
      prerequisites: [],
      grants: {
        commands: ["force_run_1", "force_meditate", "saber_throw_1"],
        certifications: ["lightsaber_certification"],
        modifiers: {
          "jedi_force_power_max": 100,
          "jedi_force_power_regen": 5,
          "lightsaber_accuracy": 15,
          "lightsaber_speed": 10
        }
      }
    },
    skillTrees: {}
  }
];
