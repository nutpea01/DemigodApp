import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.HTMLSpanElement
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.dom.addClass
import kotlin.dom.removeClass
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
    private var rollCounter = 0
    private var rollID = 0
    private var rolling = false

    fun roll(outOf: Int = 100): Int {
        return Random.nextInt(1, outOf)
    }

    fun rollStatButton(player: Player): Boolean {
        // only one roll allowed at a time
        if (rolling) return false
        rolling = true
        resetRoll()

        val statSelector = (document.getElementById("roll-stat-select") as HTMLSelectElement)
        val rollRollDisplay = (document.getElementById("roll-roll-display") as HTMLSpanElement)
        val rollStatDisplay = (document.getElementById("roll-stat-display") as HTMLSpanElement)

        val stat = when (statSelector.value) {
            "AT" -> player.baseStats.getAT()
            "DF" -> player.baseStats.getDF()
            "MA" -> player.baseStats.getMA()
            "MD" -> player.baseStats.getMD()
            "STR" -> player.baseStats.getSTR()
            "CON" -> player.baseStats.getCON()
            "INT" -> player.baseStats.getINT()
            "WILL"-> player.baseStats.getWIL()
            "SPD" -> player.baseStats.getSPD()
            "AC"  -> player.baseStats.getACC()
            else -> player.baseStats.getAT()
        }
        rollID = setInterval({
            val lastRoll = roll()
            rollStatDisplay.textContent = stat.toString()
            rollRollDisplay.textContent = "+ $lastRoll"

            if (rollCounter++ > 100) endRoll(stat, lastRoll)
            return@setInterval null
        }, 8)

        // "false" keeps page from refreshing on button press
        return false
    }

    private fun endRoll(stat: Int, lastRoll: Int) {
        rollCounter = 0
        rolling = false
        clearInterval(rollID)

        val rollTypeDisplay = (document.getElementById("roll-type-display") as HTMLSpanElement)
        val rollTotalDisplay = (document.getElementById("roll-total-display") as HTMLSpanElement)

        //rollTypeDisplay.addClass("base-stat-table__roll-span-display")
        rollTypeDisplay.textContent += when (lastRoll) {
            100 -> "Perfect Success!!!"
            90,91,92,93,94,95,96,97,98,99 -> "Critical Success!"
            1 -> "Perfect Fail...!"
            2,3,4,5,6,7,8,9,10 -> "Critical Fail..."
            else -> " "
        }
        rollTotalDisplay.textContent = "= " + (lastRoll + stat).toString()
    }

    private fun resetRoll() {
        val rollTypeDisplay = (document.getElementById("roll-type-display") as HTMLSpanElement)
        val rollTotalDisplay = (document.getElementById("roll-total-display") as HTMLSpanElement)
        rollTypeDisplay.textContent = " "
        //rollTypeDisplay.removeClass("base-stat-table__roll-span-display")
        rollTotalDisplay.textContent = " "
    }
}