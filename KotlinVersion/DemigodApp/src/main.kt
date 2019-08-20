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

    initSlots(3, 3, 3)
    initSlotButtons()
    initNavigationBar(player)
}

fun generateID(): String {
    //TODO: maybe randomize 4? can only be between 1-5
    val uuid = ""
    js("""
    var dt = new Date().getTime();
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });      """)
    return uuid
}