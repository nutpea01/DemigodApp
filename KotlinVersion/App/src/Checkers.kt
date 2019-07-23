package demigod.main

import kotlin.random.Random

class DamageHandler(
        private val player: Player
) {
    //TODO: most of these will become more interesting as we add abilities. eventually, they should likely be able to find damage themselves based on stats...?
    fun getPlayer(): Player { return this.player }
    fun dealDamage(damage: Int, target: Player) {
        target.resources.setCurrentHP(damage + DiceRoller.roll())
    }

    fun takeDamage(damage: Int, defense: Int) {
        this.player.resources.setCurrentHP((damage + DiceRoller.roll()) - defense)
    }
    fun calculateDamage(damage: Int, defense: Int): Int {
        return (damage + DiceRoller.roll()) - defense
    }

    //NOTE: so all the above formulas assume they'll be given the damage stat as is.
    //this means, something like AT+SPD will be calc BEFORE passing to this class.
    //versatile, to be sure. Problem is, it forces the burden on other classes. Find
    //a work around if able. It should be done in here somehow...

    //FUTURE IDEA: We might be able to set up a lookup table in calculateDamage. Handles
    //every possible action, including a single "custom" action for GM intervention. It
    //would be how calculateDamage() would know what to do. For instance, pass the keyword
    //"fire", and the formula would grab player's MA, target's MD, deal damage and return.
}


class StatChecker (
        private val player: Player
) {
    fun getPlayer(): Player { return this.player }

    fun checkStat(stat: Int, mod: Int): Int {
        return ((stat+mod) + DiceRoller.roll())
    }
    fun checkSkill(skill: Int, mod: Int): Boolean {
        return ((skill+mod) >= DiceRoller.roll())
    }
}


object DiceRoller {
    fun roll(outOf: Int = 100): Int {
        return Random.nextInt(1, outOf)
        /*
        //TODO: this logic will be useful if we want crit success messages
        val str = when (num) {
            100 -> "CCS"
            90,91,92,93,94,95,96,97,98,99 -> "CS"
            1 -> "CCF"
            2,3,4,5,6,7,8,9,10 -> "CF"
            else -> "N"
        }
        return Pair(num, str)
        */
    }
    //TODO: displayRoll
    fun displayRoll() {}
}