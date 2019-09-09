import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass

fun setupPage(player: Player) {
    initCharacterSheetListeners(player)
    initSlots(player, 3, 3, 4)
    initItems(player, 10)
    initSkills(player)
    initButtons(player)
    initNavigationBar(player)
    //resetPage(player)
}
fun resetPage(player: Player) {
    while (player.spells.size > 0) { deleteSpellSlot(player) }
    while (player.specials.size > 0) { deleteSpecialSlot(player) }
    while (player.classAbilities.size > 0) { deleteClassSlot(player) }
    while (player.inventory.size > 0) { deleteItemSlot(player) }
}
fun initCharacterSheetListeners(player: Player) {
    initTraitListener(player)
    initResourceListener(player)
    initStatListener(player)
    initEquipmentListener(player)
    initNotesListener(player)
}
fun initTraitListener(player: Player) {
    document.addEventListener("change", {
        val trait = it.target as HTMLInputElement
        when (trait.id) {
            "Name" -> player.traits.name = trait.value
            "Age" -> player.traits.age = trait.value.toInt()
            "Species" -> player.traits.species = trait.value
            "Class" -> player.traits._class.name = trait.value
            "Level" -> player.traits.level = trait.value.toInt()
            //TODO: not in sheet (specifically) yet, also doesn't need to be int
            "Icon" -> player.traits.icon = trait.value.toInt()
        }
    })
}
fun initResourceListener(player: Player) {
    document.addEventListener("change", {
        val resource = it.target as HTMLInputElement
        when (resource.id) {
            "currentHP" -> player.resources.setCurrentHP(resource.value.toInt())
            "currentMP" -> player.resources.setCurrentMP(resource.value.toInt())
            "currentSP" -> player.resources.setCurrentSP(resource.value.toInt())
            "maxHP" -> player.resources.setMaxHP(resource.value.toInt())
            "maxMP" -> player.resources.setMaxMP(resource.value.toInt())
            "maxSP" -> player.resources.setMaxSP(resource.value.toInt())
            "maxHP-MOD" -> player.resources.getMaxHPModifiers()[0].value = resource.value.toInt()
            "maxMP-MOD" -> player.resources.getMaxMPModifiers()[0].value = resource.value.toInt()
            "maxSP-MOD" -> player.resources.getMaxSPModifiers()[0].value = resource.value.toInt()
        }

        // update document visuals
        (document.getElementById("maxHP") as HTMLInputElement).value = player.resources.getMaxHP().toString()
        (document.getElementById("maxMP") as HTMLInputElement).value = player.resources.getMaxMP().toString()
        (document.getElementById("maxSP") as HTMLInputElement).value = player.resources.getMaxSP().toString()
    })
}
fun initStatListener(player: Player) {
    document.addEventListener("change", {
        val stat = it.target as HTMLInputElement
        when (stat.id) {
            "STR-BASE" -> player.baseStats.setSTR(stat.value.toInt())
            "CON-BASE" -> player.baseStats.setCON(stat.value.toInt())
            "INT-BASE" -> player.baseStats.setINT(stat.value.toInt())
            "WILL-BASE"-> player.baseStats.setWIL(stat.value.toInt())
            "SPD-BASE" -> player.baseStats.setSPD(stat.value.toInt())
            "AC-BASE"  -> player.baseStats.setACC(stat.value.toInt())

            "STR-MOD" -> player.baseStats.getSTRModifiers()[0].value = stat.value.toInt()
            "CON-MOD" -> player.baseStats.getCONModifiers()[0].value = stat.value.toInt()
            "INT-MOD" -> player.baseStats.getINTModifiers()[0].value = stat.value.toInt()
            "WILL-MOD"-> player.baseStats.getWILModifiers()[0].value = stat.value.toInt()
            "SPD-MOD" -> player.baseStats.getSPDModifiers()[0].value = stat.value.toInt()
            "AC-MOD"  -> player.baseStats.getACCModifiers()[0].value = stat.value.toInt()

            "AT-MOD" -> player.baseStats.combatStats.getATModifiers()[0].value = stat.value.toInt()
            "DF-MOD" -> player.baseStats.combatStats.getDFModifiers()[0].value = stat.value.toInt()
            "MA-MOD" -> player.baseStats.combatStats.getMAModifiers()[0].value = stat.value.toInt()
            "MD-MOD" -> player.baseStats.combatStats.getMDModifiers()[0].value = stat.value.toInt()
        }
        // update document visuals
        player.baseStats.updateCombat()
        (document.getElementById("AT-BASE") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getAT(false).toString()
        (document.getElementById("DF-BASE") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getDF(false).toString()
        (document.getElementById("MA-BASE") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getMA(false).toString()
        (document.getElementById("MD-BASE") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getMD(false).toString()

        (document.getElementById("AT-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getAT().toString()
        (document.getElementById("DF-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getDF().toString()
        (document.getElementById("MA-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getMA().toString()
        (document.getElementById("MD-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.combatStats.getMD().toString()

        (document.getElementById("STR-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getSTR().toString()
        (document.getElementById("CON-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getCON().toString()
        (document.getElementById("INT-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getINT().toString()
        (document.getElementById("WILL-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getWIL().toString()
        (document.getElementById("SPD-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getSPD().toString()
        (document.getElementById("AC-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getACC().toString()
    })
}
fun initEquipmentListener(player: Player) {
    document.addEventListener("change", {
        val equipment = it.target as HTMLTextAreaElement
        when (equipment.id) {
            "weapon" -> player.weapon.description = equipment.value
            "armor" -> player.armor.description = equipment.value
            "accessory" -> player.accessory.description = equipment.value
        }
    })
}
fun initNotesListener(player: Player) {
    val notes = document.getElementById("notes-div__textarea") as HTMLTextAreaElement
    notes.addEventListener("change", {
        player.inventory.notes = notes.value
    })
}
/* TODO: saved just in case
fun initAbilityListener(player: Player) {

    val spell = document.getElementById("spells-textarea-1") as HTMLTextAreaElement
    val special = document.getElementById("special-textarea-1") as HTMLTextAreaElement
    val classAbility = document.getElementById("class-abilities-textarea-1") as HTMLTextAreaElement
    spell.addEventListener("change", {
        player.spells[0].description = (it.target as HTMLTextAreaElement).value
    })
    special.addEventListener("change", {
        player.specials[0].description = (it.target as HTMLTextAreaElement).value
    })
    classAbility.addEventListener("change", {
        player.classAbilities[0].description = (it.target as HTMLTextAreaElement).value
    })
}
*/
/* TODO: saved just in case
fun initItemListener(player: Player) {
    repeat(3) {
        val textarea = document.getElementById("inventory-slot-" + (it+1)) as HTMLTextAreaElement
        val index = it
        textarea.addEventListener("change", {
            player.inventory.getItem(index).description = (it.target as HTMLTextAreaElement).value
        })
    }
    val bagType = document.getElementById("bag-type__textarea") as HTMLTextAreaElement
    bagType.addEventListener("change", {
        player.inventory.bagType = bagType.value
    })
    val notes = document.getElementById("notes-div__textarea") as HTMLTextAreaElement
    notes.addEventListener("change", {
        player.inventory.notes = notes.value
    })
}
*/



fun initNavigationBar(player: Player) {
    (document.getElementById("main-navbar__icon__save-button") as HTMLButtonElement).onclick = { FileHandler.save(player) }
    (document.getElementById("main-navbar__icon__load-button") as HTMLButtonElement).onclick = { FileHandler.load(player) }
}
fun initButtons(player: Player) {
    // initialize add buttons to insert a row
    (document.getElementById("spells-div__button-add") as HTMLButtonElement).onclick = { insertSpellSlot(player) }
    (document.getElementById("special-div__button-add") as HTMLButtonElement).onclick = { insertSpecialSlot(player) }
    (document.getElementById("class-abilities-div__button-add") as HTMLButtonElement).onclick = { insertClassSlot(player) }

    // initialize delete buttons to remove a row
    (document.getElementById("spells-div__button-del")   as HTMLButtonElement).onclick = { deleteSpellSlot(player) }
    (document.getElementById("special-div__button-del") as HTMLButtonElement).onclick = { deleteSpecialSlot(player) }
    (document.getElementById("class-abilities-div__button-del")   as HTMLButtonElement).onclick = { deleteClassSlot(player) }

    // initialize inventory buttons
    (document.getElementById("inventory-div__button-add") as HTMLButtonElement).onclick = { insertItemSlot(player) }
    (document.getElementById("inventory-div__button-del") as HTMLButtonElement).onclick = { deleteItemSlot(player) }

    // initialize stat roll button
    val rollStatButton = document.getElementById("roll") as HTMLButtonElement
    rollStatButton.onclick = {
        DiceRoller.rollStatButton(player).toString()
    }
    // secondary init for the stat selector
    val rollStatSelector = document.getElementById("roll-stat-select") as HTMLSelectElement
    rollStatSelector.addEventListener("change", {
        val span = document.getElementById("roll-stat-display")
        span!!.textContent = when (rollStatSelector.value) {
            "AT" -> player.baseStats.combatStats.getAT().toString()
            "DF" -> player.baseStats.combatStats.getDF().toString()
            "MA" -> player.baseStats.combatStats.getMA().toString()
            "MD" -> player.baseStats.combatStats.getMD().toString()
            "STR" -> player.baseStats.getSTR().toString()
            "CON" -> player.baseStats.getCON().toString()
            "INT" -> player.baseStats.getINT().toString()
            "WILL"-> player.baseStats.getWIL().toString()
            "SPD" -> player.baseStats.getSPD().toString()
            "AC"  -> player.baseStats.getACC().toString()
            else -> player.baseStats.combatStats.getAT().toString()
        }
    })
}
fun initSlots(player: Player, spellSlots: Int, specialSlots: Int, classSlots: Int) {
    repeat(spellSlots) { insertSpellSlot(player) }
    repeat(specialSlots) { insertSpecialSlot(player) }
    repeat(classSlots) { insertClassSlot(player) }
}
fun initSkills(player: Player) {
    val table = document.getElementById("skill-tree") as HTMLTableElement
    var index = 0
    while (index < player.skills.size) {
        // add row
        val row = table.insertRow()

        // two skills per row
        repeat(2) {
            val skillName = player.skills[index].name
            // first cell - skill name
            val label = row.insertCell()
            label.addClass("skill-tree__label")
            label.innerText = skillName

            // second cell - skill number
            val value = row.insertCell()
            val input = document.createElement("input") as HTMLInputElement
            input.type = "number"
            input.name = "skill-number"
            input.placeholder = "0"
            input.addClass("skill-tree__number")
            input.addEventListener("change", {
                player.getSkill(skillName)!!.value.setBase((it.target as HTMLInputElement).value.toInt())
            })
            value.appendChild(input)


            // third cell - skill checkbox
            val check = row.insertCell()
            check.addClass("skill-tree__td-checkbox")
            val checkbox = document.createElement("input") as HTMLInputElement
            checkbox.type = "checkbox"
            checkbox.name = "roll-check"
            checkbox.addClass("skill-tree__checkbox")
            checkbox.addEventListener("change", {
                player.getSkill(skillName)!!.check = checkbox.checked
            })
            check.appendChild(checkbox)

            // update index
            index++
        }
    }
}
fun initItems(player: Player, amount: Int) {
    repeat(amount) {
        insertItemSlot(player)
    }
}


fun insertSpellSlot(player: Player): Boolean {
    player.spells.add(Spell())
    return insertAbilitySlot(player, "spells", "Spell-Circle-Icon-Web-Dev80px.png", player.spells.size)
}
fun insertSpecialSlot(player: Player): Boolean {
    player.specials.add(Special())
    return insertAbilitySlot(player, "special", "Triangle Icon - Web Dev.png", player.specials.size)
}
fun insertClassSlot(player: Player): Boolean {
    player.classAbilities.add(ClassAbility())
    return insertAbilitySlot(player, "class-abilities", "class-abilities-demigod100px.png", player.classAbilities.size)
}
fun insertAbilitySlot(
        player: Player,
        type: String,
        image: String = "Hold Primary Logo 240px.png",
        size: Int
): Boolean {
    // access table and create new row
    val table = document.getElementById("$type-div__table") as HTMLTableElement
    val row = table.insertRow()

    // create icon cell (first)
    val icon = row.insertCell(0)
    icon.addClass("$type-div__td-image")
    val img = document.createElement("img") as HTMLImageElement
    img.addClass("$type-div__image")
    img.src = image
    img.id =  "$type-img-$size"
    icon.appendChild(img)

    // create text cell (second)
    val text = row.insertCell(1)
    text.addClass("$type-div__td-textarea")
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.addClass("$type-div__textarea")
    textarea.id =  "$type-textarea-$size"

    // add eventListener based on which type it is
    textarea.addEventListener("change", {
        when (type) {
            "spells" -> player.spells[size-1].description = (it.target as HTMLTextAreaElement).value
            "special" -> player.specials[size-1].description = (it.target as HTMLTextAreaElement).value
            "class-abilities" -> player.classAbilities[size-1].description = (it.target as HTMLTextAreaElement).value
        }
    })

    // finally append
    text.appendChild(textarea)

    // "false" keeps page from refreshing on button press
    return false
}
fun deleteSpellSlot(player: Player): Boolean {

    val table = document.getElementById("spells-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    player.spells.removeAt(player.spells.size -1)
    return false
}
fun deleteSpecialSlot(player: Player): Boolean {
    val table = document.getElementById("special-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    player.specials.removeAt(player.specials.size -1)
    return false
}
fun deleteClassSlot(player: Player): Boolean {
    val table = document.getElementById("class-abilities-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    player.classAbilities.removeAt(player.classAbilities.size -1)
    return false
}



fun insertItemSlot(player: Player): Boolean {
    val table = document.getElementById("inventory-div__slot-table") as HTMLTableElement
    var row: HTMLTableRowElement
    // check for empty table exception
    if (table.rows.length == 0) {
        row = table.insertRow()
    }
    // table has at least one row
    else {
        // default - row is last row in table
        row = table.rows[table.rows.length-1] as HTMLTableRowElement
        if (row.cells.length == 3) {
            // create new row if at 3 cells in current
            row = table.insertRow()
        }
    }

    row.insertCell().appendChild(createItemSlot(player))

    // "false" keeps page from refreshing on button press
    return false
}
fun createItemSlot(player: Player): HTMLTextAreaElement {
    // update player
    player.inventory.addItem(Item())

    // create textarea cell
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.name = "inventory-slot"
    textarea.addClass("inventory-div__slot")
    textarea.id = "inventory-slot-" + player.inventory.size

    // add EventListener
    val index = player.inventory.size-1
    textarea.addEventListener("change", {
        // index must be declared outside the eventListener to stay constant
        player.inventory.getItem(index).description = (it.target as HTMLTextAreaElement).value
    })

    return textarea
}
fun deleteItemSlot(player: Player): Boolean {
    // update player, cancel out if 0
    if (player.inventory.size == 0) {

        return false
    }

    player.inventory.removeLastItem()

    val table = document.getElementById("inventory-div__slot-table") as HTMLTableElement
    val row = table.rows[table.rows.length-1] as HTMLTableRowElement

    // if there is only one cell in the table...
    if (row.cells.length == 1) {
        table.deleteRow(table.rows.length-1)
    } else {
        row.deleteCell(row.cells.length-1)
    }

    // "false" keeps page from refreshing on button press
    return false
}