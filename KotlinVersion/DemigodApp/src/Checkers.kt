import kotlin.random.Random

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