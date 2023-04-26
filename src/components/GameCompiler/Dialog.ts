type Dialog = {
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

const createDialog = () => {
    return {
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
    };
};

const Opponent: Record<string, Dialog> = {
    // World Opponents
    "Achreon Druid" : {
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
    "Cambiren Druid": {
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
    "Chiomic Jester": {
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
    "Kyn'gian Shaman": {
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
    "Licivitan Soldier": {
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
    "Nyren": {
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
    "Old Li'ivi Occultist": {
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
    "Quor'eite Occultist": {
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
    "Rahvrecur": {
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
    "Se'dyrist": {
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
    "Sedyreal Guard": {
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
    "Se'va Shrieker": {
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
    "Shrygeian Bard": {
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
    "Southron Wanderer" : {
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
    "Ashreu'ul": {
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
    "Cyrian Shyne": {
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
    "Daetheus": {
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
    "Laetrois Ath'Shaorah": {
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
    "Quor'estes": {
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
    "Relien Myelle": {
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
    "Sky": {
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
    },
    "Vincere": {
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
    },
} 

export function getNpcDialog(npc: string): Dialog {
    if (!(npc in Opponent)) {
        console.log("NPC not found: " + npc + ". Creating Generic Dialog");
        return createDialog();
    };
    return Opponent[npc];
};
  

type MerchantDialog = {
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
    services: {
        respect: string[];
        familiarity: string[];
        text: {
            lesser: {
                unfamiliar: string;
                familiar: string;
                intimate: string;
            };
            neutral: {
                unfamiliar: string;
                familiar: string;
                intimate: string;
            };
            greater: {
                unfamiliar: string;
                familiar: string;
                intimate: string;
            };
        }
    };
};

const NPC: Record<string, MerchantDialog> = {
    // World Opponents
    "Traveling General Merchant" : {
        farewell: {
            text: {
                lesser: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
                neutral: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
                greater: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
            },
        },
        services: {
            respect: ["lesser", "neutral", "greater"],
            familiarity: ["unfamiliar", "familiar", "intimate"],
            text: {
                lesser: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
                neutral: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
                greater: {
                    unfamiliar: "I don't know you, but I'll sell you some goods.",
                    familiar: "Oh, yes, it's you again. How have you been? Would you care to see my wares?",
                    intimate: "Hey, friend, welcome back!",
                },
            },
        },
    },
}

export function getMerchantDialog(merchant: string): MerchantDialog {
    if (!(merchant in NPC)) {
        throw new Error(`Merchant '${merchant}' not found in NPC object.`);
    }
    return NPC[merchant];
};