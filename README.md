# Platform
	PC/Desktop App.
		HTML5 and CSS for frontend design.
			Adam will handle visual mockups and eventually visual design.
			I can assist if needed.
		-Language- on backend. TBD.
			Focus on localhosting a blank HTML+CSS page.
	VISUAL DESIGN IS NOT NECESSARY FOR A LONG TIME. Focus on ugly but working.

#Starter Requirments

MUST indicates a requirement that cannot be missing from the app.
SHALL indicates a requirement that should be in the app, but can be dropped if necessary.
CAN indicated a requirement that is unecessary and easily ignored.


the app MUST track the player's HP, MP, SP values
the app MUST track the player's MAX HP, MP, SP values
the app MUST track the player's AT, MA, DF, MD, SP, AC values
the app MUST track stat modifiers (bonuses and detriments)
	the app MUST make the two distinct (base + bonus = current)
the app SHALL be able to ROLL for the player
the app SHALL be able to distinguish crit successes/failures

if we can roll:
	the app MUST be able to add AT or MA to the roll, and output the damage.
	the app MUST be able to accept damage and automatically reduce HP (after DF/MD)
	the app MUST be able to choose the stats used (AT+SPD-MD = damage, and ANY other weird combo)
	the app SHALL be able to select multipliers (50% or 200% damage, x3 hits, AoE, etc.)

the app MUST track the user's simple stats (Name, Level, Class, top of page)
the app SHALL handle the user's leveling for base stats (adding points)
	the app SHALL make skillups easy with shortcuts (+5, +10, +20 button, MAX)
the app SHALL limit the user's leveling (max of 30 per level for base)

the app SHALL handle skill display
the app SHALL handle skill modifiers (bonuses and detriments)
the app SHALL handle skill ROLLs for the player

the app CAN track the user's inventory, allowing manual entry
the app CAN track the user's gold, max item slots
the app CAN track the user's current abilities
the app CAN track how user's abilities are split (what is spell, what is special, what is class)
the app CAN allow the user to "Buy" new abilities



# Vague Requirements

The app can create a character for you (I.E run you through the steps bit by bit with explanations on the way.)
The app can assist GMs with special information, interesting lore, and total control over their campaign, maybe even offering pre-built campaigns, maps, etc.

terms and effects are explained if needed at a single tap.

Your actions/turn is laid out in front of you. I.E. your turn starts and the game explains you have an attack phase, spell/special phase, move phase. Asks you how you want to use each phase, and you can "lock in" actions based on each.

mapping system could exist like in (Diver Campaign) where cartography skill factors in the detail the player's map can show (while GM has full map for them)

FE style grid map that lines people up, so ranges and movement matter much more, like a real board. Drag your sprite across the battlefield.


# Future Work
FUTURE: ability object
damageStat (AT, MA, or weird SPD, DF etc.)
defenseStat (DF, MD, or weird true, SPD etc.)
Name, cost, range, etc.
canDodge
canMiss
isStun
isAirborne
isTrap
...

will be very tough, but work through it. Damage is simple, base stats simple. Effects get MUCH stranger, but even that is ok, because quite a few of them can be ignored (handled by player/GM).
	Idea: remove +6 rolls in every case, change to raw %. lets us be much more creative (30%, 75%, 10%, etc.)
on that line, cost COULD be calculated by ability effects. Talking point for later.



