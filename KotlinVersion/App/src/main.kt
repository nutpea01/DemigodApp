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
    hpHeal.addEventListener("click", { HPHeal(player, hpInput.value.toInt()) })
    val hpDamage = document.getElementById("hpDamage") as HTMLButtonElement
    hpDamage.addEventListener("click", { HPDamage(player, hpInput.value.toInt())})

    val mpInput = document.getElementById("mpInput") as HTMLInputElement
    val mpHeal = document.getElementById("mpHeal") as HTMLButtonElement
    mpHeal.addEventListener("click", { MPHeal(player, mpInput.value.toInt()) })
    val mpDamage = document.getElementById("mpDamage") as HTMLButtonElement
    mpDamage.addEventListener("click", { MPDamage(player, mpInput.value.toInt())})

    val spInput = document.getElementById("spInput") as HTMLInputElement
    val spHeal = document.getElementById("spHeal") as HTMLButtonElement
    spHeal.addEventListener("click", { SPHeal(player, spInput.value.toInt()) })
    val spDamage = document.getElementById("spDamage") as HTMLButtonElement
    spDamage.addEventListener("click", { SPDamage(player, spInput.value.toInt())})
}


fun HPDamage(player: Player, damage: Int) {
    val hp = player.resources.getCurrentHP()
    val df = player.baseStats.combatStats.getDF()
    player.resources.setCurrentHP(hp - (damage - df))
    displayStats(player)
}
fun HPHeal(player: Player, heal: Int) {
    val hp = player.resources.getCurrentHP()
    player.resources.setCurrentHP(hp+heal)
    displayStats(player)
}

fun MPDamage(player: Player, damage: Int) {
    val mp = player.resources.getCurrentMP()
    player.resources.setCurrentMP(mp - damage)
    displayStats(player)
}
fun MPHeal(player: Player, heal: Int) {
    val mp = player.resources.getCurrentMP()
    player.resources.setCurrentMP(mp+heal)
    displayStats(player)
}

fun SPDamage(player: Player, damage: Int) {
    val sp = player.resources.getCurrentSP()
    player.resources.setCurrentSP(sp - damage)
    displayStats(player)
}
fun SPHeal(player: Player, heal: Int) {
    val sp = player.resources.getCurrentSP()
    player.resources.setCurrentSP(sp+heal)
    displayStats(player)
}


//TODO: Ability
class Ability