package demigod.main

import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLInputElement
import kotlin.browser.document

//import java.util.UUID

/**
 * The starting point of EVERYTHING for this app.
 */
fun main() {
    val player = Player()
    player.baseStats.setSTR(35)
    player.baseStats.setCON(50)
    player.baseStats.setINT(10)
    player.baseStats.setWIL(50)
    player.baseStats.setACC(20)

    player.resources.setMaxHP(400)
    player.resources.setMaxMP(250)
    player.resources.setMaxSP(200)
    player.resources.setCurrentHP(400)
    player.resources.setCurrentMP(250)
    player.resources.setCurrentSP(200)

    displayStats(player)
    setupButtons(player)
}

fun generateID(): String {
    return ""
    //return UUID.randomUUID().toString()
}

//TODO: testing
fun displayStats(player: Player) {
    document.getElementById("b1")!!.innerHTML = player.baseStats.getSTR().toString()
    document.getElementById("b2")!!.innerHTML = player.baseStats.getCON().toString()
    document.getElementById("b3")!!.innerHTML = player.baseStats.getINT().toString()
    document.getElementById("b4")!!.innerHTML = player.baseStats.getWIL().toString()

    document.getElementById("c1")!!.innerHTML = player.baseStats.combatStats.getAT().toString()
    document.getElementById("c2")!!.innerHTML = player.baseStats.combatStats.getDF().toString()
    document.getElementById("c3")!!.innerHTML = player.baseStats.combatStats.getMA().toString()
    document.getElementById("c4")!!.innerHTML = player.baseStats.combatStats.getMD().toString()

    document.getElementById("a1")!!.innerHTML = player.baseStats.getSPD().toString()
    document.getElementById("a2")!!.innerHTML = player.baseStats.getACC().toString()

    document.getElementById("b5")!!.innerHTML = player.resources.getCurrentHP().toString()
    document.getElementById("b6")!!.innerHTML = player.resources.getCurrentMP().toString()
    document.getElementById("b7")!!.innerHTML = player.resources.getCurrentSP().toString()

    document.getElementById("c5")!!.innerHTML = player.resources.getMaxHP().toString()
    document.getElementById("c6")!!.innerHTML = player.resources.getMaxMP().toString()
    document.getElementById("c7")!!.innerHTML = player.resources.getMaxSP().toString()
}

//TODO: testing
fun setupButtons(player: Player) {
    val hpInput = document.getElementById("hpInput") as HTMLInputElement
    val hpHeal = document.getElementById("hpHeal") as HTMLButtonElement
    hpHeal.addEventListener("click", { player.resources.healHP(hpInput.value.toInt()) ;displayStats(player)})
    val hpDamage = document.getElementById("hpDamage") as HTMLButtonElement
    hpDamage.addEventListener("click", { player.resources.takeDamage(hpInput.value.toInt());displayStats(player)})

    val mpInput = document.getElementById("mpInput") as HTMLInputElement
    val mpHeal = document.getElementById("mpHeal") as HTMLButtonElement
    mpHeal.addEventListener("click", { player.resources.restoreMP(mpInput.value.toInt()) ;displayStats(player)})
    val mpDamage = document.getElementById("mpDamage") as HTMLButtonElement
    mpDamage.addEventListener("click", { player.resources.spendMP(mpInput.value.toInt());displayStats(player)})

    val spInput = document.getElementById("spInput") as HTMLInputElement
    val spHeal = document.getElementById("spHeal") as HTMLButtonElement
    spHeal.addEventListener("click", { player.resources.restoreSP(spInput.value.toInt());displayStats(player) })
    val spDamage = document.getElementById("spDamage") as HTMLButtonElement
    spDamage.addEventListener("click", { player.resources.spendSP(spInput.value.toInt());displayStats(player)})
}

//TODO: Ability
class Ability