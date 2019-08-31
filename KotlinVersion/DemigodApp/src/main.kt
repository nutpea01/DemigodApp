/**
 * The starting point of EVERYTHING for this app.
 */
fun main() {
    //simple testing player
    val player = Player()
    tempSheetLogic(player)

    initCharacterSheetListeners(player)
    initSlots(player, 0, 0, 0)
    initSkills(player)
    initSlotButtons(player)
    initNavigationBar(player)
}

fun tempSheetLogic(player: Player) {
    //TODO: Init a single modifier that will be editable by the current sheet
    player.baseStats.getSTRModifiers().add(Modifier(""))
    player.baseStats.getCONModifiers().add(Modifier(""))
    player.baseStats.getINTModifiers().add(Modifier(""))
    player.baseStats.getWILModifiers().add(Modifier(""))
    player.baseStats.getSPDModifiers().add(Modifier(""))
    player.baseStats.getACCModifiers().add(Modifier(""))
    player.baseStats.combatStats.getATModifiers().add(Modifier(""))
    player.baseStats.combatStats.getDFModifiers().add(Modifier(""))
    player.baseStats.combatStats.getMAModifiers().add(Modifier(""))
    player.baseStats.combatStats.getMDModifiers().add(Modifier(""))
    player.resources.getMaxHPModifiers().add(Modifier(""))
    player.resources.getMaxMPModifiers().add(Modifier(""))
    player.resources.getMaxSPModifiers().add(Modifier(""))
    player.spells.add(Spell())
    player.specials.add(Special())
    player.classAbilities.add(ClassAbility())
    player.inventory.addItem(Item())
    player.inventory.addItem(Item())
    player.inventory.addItem(Item())
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