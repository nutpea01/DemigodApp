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