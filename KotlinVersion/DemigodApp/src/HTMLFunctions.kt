package demigod.main

import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass

//TODO: testing
fun displayStats(player: Player) {
    document.getElementById("b1")?.innerHTML = player.baseStats.getSTR().toString()
    document.getElementById("b2")?.innerHTML = player.baseStats.getCON().toString()
    document.getElementById("b3")?.innerHTML = player.baseStats.getINT().toString()
}
//TODO: testing
fun setupButtons(player: Player) {
    val hpInput = document.getElementById("hpInput") as HTMLInputElement
    val hpHeal = document.getElementById("hpHeal") as HTMLButtonElement
    hpHeal.addEventListener("click", { player.resources.healHP(hpInput.value.toInt()) ;displayStats(player) })
    val hpDamage = document.getElementById("hpDamage") as HTMLButtonElement
    hpDamage.addEventListener("click", { player.resources.takeDamage(hpInput.value.toInt());displayStats(player) })
}

fun initSlotButtons() {
    // initialize add buttons to insert a row
    (document.getElementById("spell-add")   as HTMLButtonElement).onclick = { insertSpellSlot() }
    (document.getElementById("special-add") as HTMLButtonElement).onclick = { insertSpecialSlot() }
    (document.getElementById("class-add")   as HTMLButtonElement).onclick = { insertClassSlot() }

    // initialize delete buttons to remove a row
    (document.getElementById("spell-del")   as HTMLButtonElement).onclick = { deleteSpellSlot() }
    (document.getElementById("special-del") as HTMLButtonElement).onclick = { deleteSpecialSlot() }
    (document.getElementById("class-del")   as HTMLButtonElement).onclick = { deleteClassSlot() }
}

fun initSlots(spellSlots: Int, specialSlots: Int, classSlots: Int) {
    repeat(spellSlots) { insertSpellSlot() }
    repeat(specialSlots) { insertSpecialSlot() }
    repeat(classSlots) { insertClassSlot() }

}





fun insertSpellSlot(): Boolean {
    val table = document.getElementById("abilities-spell") as HTMLTableElement
    return insertAbilitySlot(table)
}
fun insertSpecialSlot(): Boolean {
    val table = document.getElementById("abilities-special") as HTMLTableElement
    return insertAbilitySlot(table)
}
fun insertClassSlot(): Boolean {
    val table = document.getElementById("abilities-class") as HTMLTableElement
    return insertAbilitySlot(table)
}
fun insertAbilitySlot(table: HTMLTableElement, image: String = "Hold Primary Logo 240px.png"): Boolean {
    val row = table.insertRow()

    //create icon cell
    val icon = row.insertCell(0)
    val img = document.createElement("img") as HTMLImageElement
    img.src = image
    img.addClass("equipment-div__image")
    icon.appendChild(img)

    //create text cell
    val text = row.insertCell(1)
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.addClass("spells-div__textarea")
    text.appendChild(textarea)

    //this is added to keep page from refreshing on button press
    return false
}





fun deleteSpellSlot(): Boolean {
    val table = document.getElementById("abilities-spell") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}
fun deleteSpecialSlot(): Boolean {
    val table = document.getElementById("abilities-special") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}
fun deleteClassSlot(): Boolean {
    val table = document.getElementById("abilities-class") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}