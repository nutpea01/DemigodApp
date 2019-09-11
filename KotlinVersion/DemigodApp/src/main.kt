import kotlin.browser.document

/**
 * The starting point of EVERYTHING for this app.
 */
fun main() {
    //simple testing player
    var player = Player()
    tempSheetLogic(player)
    setupPage(player)
    (document.getElementById("resource-stats__form"))!!.addEventListener("submit", {
        it.preventDefault()
    })
}

fun tempSheetLogic(player: Player) {
    //TODO: Init a single modifier that will be editable by the current sheet
    player.baseStats.getSTRModifiers().add(Modifier(""))
    player.baseStats.getCONModifiers().add(Modifier(""))
    player.baseStats.getINTModifiers().add(Modifier(""))
    player.baseStats.getWILModifiers().add(Modifier(""))
    player.baseStats.getSPDModifiers().add(Modifier(""))
    player.baseStats.getACCModifiers().add(Modifier(""))
    player.baseStats.getATModifiers().add(Modifier(""))
    player.baseStats.getDFModifiers().add(Modifier(""))
    player.baseStats.getMAModifiers().add(Modifier(""))
    player.baseStats.getMDModifiers().add(Modifier(""))
    player.resources.getMaxHPModifiers().add(Modifier(""))
    player.resources.getMaxMPModifiers().add(Modifier(""))
    player.resources.getMaxSPModifiers().add(Modifier(""))
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