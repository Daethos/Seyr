type Dialog = {
    combat: {
        actions: string,
        character: string,
        combat: string,
        leveling: string,
        progression: string,
    };
    conditions: {
        respect: string[];
        familiarity: string[];
    };
    challenge: {
      text: {
        lesser: {
            unfamiliar: string,
            familiar: string,
            intimate: string,
        },
        neutral: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        },
        greater: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        }
      };
    };
    defeat: {
      text: {
        lesser: {
            unfamiliar: string,
            familiar: string,
            intimate: string,
        },
        neutral: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        },
        greater: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        }
      };
    };
    farewell: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    greeting: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    localLore: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    localWhispers: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };  
    };
    persuasion: {
        request: {
            text: {
                lesser: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string,
                },
                neutral: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                },
                greater: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                }
            };
        },
        offer: {
            text: {
                lesser: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string,
                },
                neutral: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                },
                greater: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                }
            };
        },
        acceptance: {
            text: {
                lesser: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string,
                },
                neutral: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                },
                greater: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                }
            };
        },
        rejection: {
            text: {
                lesser: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string,
                },
                neutral: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                },
                greater: {
                    unfamiliar: string,
                    familiar: string,
                    intimate: string
                }
            };
        }
    };
    praise: {
      text: {
        lesser: {
            unfamiliar: string,
            familiar: string,
            intimate: string,
        },
        neutral: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        },
        greater: {
            unfamiliar: string,
            familiar: string,
            intimate: string
        }
      };
    };
    provincialWhispers: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    taunt: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    victory: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
    worldLore: {
        text: {
            lesser: {
                unfamiliar: string,
                familiar: string,
                intimate: string,
            },
            neutral: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            },
            greater: {
                unfamiliar: string,
                familiar: string,
                intimate: string
            }
        };
    };
};

const Opponent: Record<string, Dialog> = {
    // World Opponents
    "Achreon Druid" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
    }, // Daethic Kingdom - Soverains || Lvl 4
    "Ahn'are Apostle": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Firelands || Lvl 4
    "Anashtre": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Astralands || Lvl 6
    "Astral Apostle": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Astralands || Lvl 4
    "Daethic Inquisitor": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Licvitas || Lvl 6
    "Daethic Knight": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Licivitas || Lvl 6
    "Fang Duelist" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // West Fangs || Lvl 1
    "Fang Mercenary": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},  // West Fangs || Lvl 1
    "Firesworn": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Firelands || Lvl 6
    "Fyers Occultist": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Firelands || Lvl 4
    "Ilire Occultist": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Daethic Kingdom - Soverains || Lvl 4
    "Kingsman": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Daethic Kingdom || Lvl 6
    "Licivitan Soldier": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Licivitas || Lvl 6
    "Ma'ier Occultist": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Firelands - Sedyrus || Lvl 4
    "Marauder": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},  // West Fangs || Lvl 1
    "Northren Wanderer" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // No Man's Land || Lvl 1
    "Quor'eite Occultist": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Sedyrus || Lvl 4
    "Quor'eite Stalker" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Sedyrus || Lvl 1
    "Sedyreal Guard": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Sedyrus || Lvl 6
    "Southron Wanderer" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Sedyrus || Lvl 1
    "Soverain Blood Cloak": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Soverains || Lvl 6
    "Tshaeral Shaman" : {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },}, // Sedyrus || Lvl 4

    // // Named Opponents
    "Cyrian Shyne": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Dorien Caderyn": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Eugenes": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Evrio Lorian Peroumes": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Fierous Ashfyre": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Garris Ashenus": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "King Mathyus Caderyn": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Kreceus": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Leaf": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Lorian": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Mavros Ilios": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Mirio": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Sera Lorian": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Sulla": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Synaethi Spiras": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},
    "Torreous Ashfyre": {
        combat: {
            actions: "Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. \n Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. \n  Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. \n Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. \n Dodge - The dirty dodge, a high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same perverse art of the dodge, which comes down to whose refreshes faster as well. Go figure?",
            character: "Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.",
            combat: "When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.",
            leveling: "As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, that being gaining strength in yourself and the utilization of your equipment, becoming more skillful and better suited for the quality of your regalia, tweaking and molding your once refined movements of lesser gear back to a mastery that can appreciate your newfound quality.",
            progression: "And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP (which is live and functional) and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you."
        },
        conditions: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"]
        },
        challenge: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        defeat: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        greeting: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        localWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        persuasion: {
            request: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            offer: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            acceptance: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            },
            rejection: {
                text: {
                    lesser: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    neutral: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    },
                    greater: {
                        unfamiliar: "",
                        familiar: "",
                        intimate: ""
                    }
                },
            }
        },
        praise: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },
        provincialWhispers: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        taunt: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        victory: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
        },
        },
        worldLore: {
            text: {
                lesser: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                neutral: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                },
                greater: {
                    unfamiliar: "",
                    familiar: "",
                    intimate: ""
                }
            },
        },},


} 

export function getNpcDialog(npc: string): Dialog {
    // Check if the NPC exists in the Opponent object
    if (!(npc in Opponent)) {
      throw new Error(`NPC '${npc}' not found in Opponent object.`);
    }
  
    return Opponent[npc];
  }
  