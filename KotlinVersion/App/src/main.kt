package demigod.main

import kotlin.browser.document
//import java.util.UUID

/**
 * The starting point of EVERYTHING for this app.
 */
fun main() {
    val tester = Player()
    tester.baseStats.setSTR(35)
    tester.baseStats.setCON(50)
    tester.baseStats.setINT(10)
    tester.baseStats.setWIL(50)
    tester.baseStats.setACC(20)
    tester.baseStats.setSPD(15)

    tester.resources.setHP(300)
    tester.resources.setMP(250)
    tester.resources.setSP(200)
}

fun generateID(): String {
    return ""
    //return UUID.randomUUID().toString()
}


class StatHandler {
    var at = 100
    var df = 50
    var hp = 300

    private fun ouch() {
        this.hp -= this.at-this.df
        document.getElementById("b5")!!.innerHTML = this.hp.toString()
    }
}