import kotlin.browser.document

/**
 * The starting point of EVERYTHING for this app.
 */
fun main() {
    //simple testing player
    val player = Player()
    tempSheetLogic(player)
    setupPage(player)
    (document.getElementById("resource-stats__form"))!!.addEventListener("submit", {
        it.preventDefault()
    })
}

fun tempSheetLogic(player: Player) {
    player.resources
    //TODO: Init a single modifier that will be editable by the current sheet
    js("player.baseStats.getSTRModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getCONModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getINTModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getWILModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getSPDModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getACCModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getATModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getDFModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getMAModifiers().push(Modifier(\"\"))")
    js("player.baseStats.getMDModifiers().push(Modifier(\"\"))")
    js("player.resources.getMaxHPModifiers().push(Modifier(\"\"))")
    js("player.resources.getMaxMPModifiers().push(Modifier(\"\"))")
    js("player.resources.getMaxSPModifiers().push(Modifier(\"\"))")
}

fun generateID(): String {
    //TODO: maybe randomize 4? can only be between 1-4
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