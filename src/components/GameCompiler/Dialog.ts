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
    }, // Daethic Kingdom - Soverains
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
        },}, // Firelands
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
        },}, // Astralands
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
        },}, // Astralands
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
        },}, // Licvitas
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
        },}, // Licivitas
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
        },}, // West Fangs
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
        },},  // West Fangs
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
        },}, // Firelands
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
        },}, // Firelands
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
        },}, // Daethic Kingdom - Soverains
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
        },}, // Daethic Kingdom
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
        },}, // Licivitas
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
        },}, // Firelands - Sedyrus
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
        },},  // West Fangs
    "Northern Wanderer" : {
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
        },}, // No Man's Land
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
        },}, // Sedyrus
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
        },}, // Sedyrus
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
        },}, // Sedyrus
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
        },}, // Sedyrus
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
        },}, // Soverains
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
        },}, // Sedyrus

    // // Named Opponents
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
        },},


} 

export function getNpcDialog(npc: string): Dialog {
    // Check if the NPC exists in the Opponent object
    if (!(npc in Opponent)) {
      throw new Error(`NPC '${npc}' not found in Opponent object.`);
    }
  
    return Opponent[npc];
  }
  