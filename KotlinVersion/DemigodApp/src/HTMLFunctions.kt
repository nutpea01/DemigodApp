import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass

fun initTraitListeners(player: Player) {
    val name = (document.getElementById("Name") as HTMLInputElement)
    name.addEventListener("change", {
        player.traits.name = name.value
    } )

    val age = (document.getElementById("Age") as HTMLInputElement)
    age.addEventListener("change", {
        player.traits.age = age.value.toInt()
    } )

    val species = (document.getElementById("Species") as HTMLInputElement)
    species.addEventListener("change", {
        player.traits.species = species.value
    } )

    val _class = (document.getElementById("Class") as HTMLInputElement)
    _class.addEventListener("change", {
        player.traits._class.name = _class.value
    } )

    val level = (document.getElementById("Level") as HTMLInputElement)
    level.addEventListener("change", {
        player.traits.level = level.value.toInt()
    } )
}
fun initStatListener(player: Player) {
    val level = (document.getElementById("Level") as HTMLInputElement)
    level.addEventListener("change", {
        player.traits.level = level.value.toInt()
    } )
}
fun initNavigationBar(player: Player) {
    (document.getElementById("main-navbar__icon__save-button") as HTMLButtonElement).onclick = { FileHandler.save("test", player) }
    (document.getElementById("main-navbar__icon__load-button") as HTMLButtonElement).onclick = { FileHandler.load() }
}
fun initSlotButtons() {
    // initialize add buttons to insert a row
    (document.getElementById("spells-div__button-add")   as HTMLButtonElement).onclick = { insertSpellSlot() }
    (document.getElementById("special-div__button-add") as HTMLButtonElement).onclick = { insertSpecialSlot() }
    (document.getElementById("class-abilities-div__button-add")   as HTMLButtonElement).onclick = { insertClassSlot() }

    // initialize delete buttons to remove a row
    (document.getElementById("spells-div__button-del")   as HTMLButtonElement).onclick = { deleteSpellSlot() }
    (document.getElementById("special-div__button-del") as HTMLButtonElement).onclick = { deleteSpecialSlot() }
    (document.getElementById("class-abilities-div__button-del")   as HTMLButtonElement).onclick = { deleteClassSlot() }
}
fun initSlots(spellSlots: Int, specialSlots: Int, classSlots: Int) {
    repeat(spellSlots) { insertSpellSlot() }
    repeat(specialSlots) { insertSpecialSlot() }
    repeat(classSlots) { insertClassSlot() }
}



fun insertSpellSlot(): Boolean { return insertAbilitySlot("spells") }
fun insertSpecialSlot(): Boolean { return insertAbilitySlot("special") }
fun insertClassSlot(): Boolean { return insertAbilitySlot("class-abilities") }
fun insertAbilitySlot(type: String, image: String = "Hold Primary Logo 240px.png"): Boolean {
    //access table and create new row
    val table = document.getElementById("$type-div__table") as HTMLTableElement
    val row = table.insertRow()

    //create icon cell (first)
    val icon = row.insertCell(0)
    icon.addClass("$type-div__td-image")
    val img = document.createElement("img") as HTMLImageElement
    img.addClass("$type-div__image")
    img.src = image
    icon.appendChild(img)

    //create text cell (second)
    val text = row.insertCell(1)
    text.addClass("$type-div__td-textarea")
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.addClass("$type-div__textarea")
    text.appendChild(textarea)

    //"false" keeps page from refreshing on button press
    return false
}



fun deleteSpellSlot(): Boolean {
    val table = document.getElementById("spells-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}
fun deleteSpecialSlot(): Boolean {
    val table = document.getElementById("special-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}
fun deleteClassSlot(): Boolean {
    val table = document.getElementById("class-abilities-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    return false
}