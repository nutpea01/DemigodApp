import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass
import kotlin.reflect.typeOf

fun setupPage(player: Player) {
    initCharacterSheetListeners(player)
    initSlots(player, 3, 3, 4)
    initItems(player, 10)
    initSkills(player)
    initButtons(player)
    initNavigationBar(player)
}
fun resetPage(player: Player) {
    while (player.abilities.getSpellList().size > 0) { deleteSpellSlot(player.abilities) }
    while (player.abilities.getSpecialList().size > 0) { deleteSpecialSlot(player.abilities) }
    while (player.abilities.getClassAbilityList().size > 0) { deleteClassSlot(player.abilities) }
    while (player.inventory.getItems().size > 0) { deleteItemSlot(player.inventory) }
}

fun initCharacterSheetListeners(player: Player) {
    initTraitListener(player)
    initResourceListener(player)
    initStatListener(player)
    initEquipmentListener(player)
    initInventoryListener(player)
}
fun initTraitListener(player: Player) {
    document.addEventListener("change", {
        val trait = it.target
        if (trait is HTMLInputElement) {
            when (trait.id) {
                "Name" -> player.traits.setName(trait.value)
                "Age" -> player.traits.setAge(trait.value.toInt())
                "Species" -> player.traits.setSpecies(trait.value)
                "Class" -> player.traits.setClassName(trait.value)
                "Level" -> player.traits.setLevel(trait.value.toInt())
                //TODO: not in sheet (specifically) yet, also doesn't need to be int
                //"Icon" -> player.traits.icon = trait.value.toInt()
            }
         }
    })
}
fun initResourceListener(player: Player) {
    document.addEventListener("change", {
        val resource = it.target
        if (resource is HTMLInputElement) {
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
        }
    })
}
fun initStatListener(player: Player) {
    document.addEventListener("change", {
        val stat = it.target
        if (stat is HTMLInputElement) {
            when (stat.id) {
                "STR-BASE" -> player.baseStats.setSTR(stat.value.toInt())
                "CON-BASE" -> player.baseStats.setCON(stat.value.toInt())
                "INT-BASE" -> player.baseStats.setINT(stat.value.toInt())
                "WILL-BASE" -> player.baseStats.setWIL(stat.value.toInt())
                "SPD-BASE" -> player.baseStats.setSPD(stat.value.toInt())
                "AC-BASE" -> player.baseStats.setACC(stat.value.toInt())

                "STR-MOD" -> player.baseStats.getSTRModifiers()[0].value = stat.value.toInt()
                "CON-MOD" -> player.baseStats.getCONModifiers()[0].value = stat.value.toInt()
                "INT-MOD" -> player.baseStats.getINTModifiers()[0].value = stat.value.toInt()
                "WILL-MOD" -> player.baseStats.getWILModifiers()[0].value = stat.value.toInt()
                "SPD-MOD" -> player.baseStats.getSPDModifiers()[0].value = stat.value.toInt()
                "AC-MOD" -> player.baseStats.getACCModifiers()[0].value = stat.value.toInt()

                "AT-MOD" -> player.baseStats.getATModifiers()[0].value = stat.value.toInt()
                "DF-MOD" -> player.baseStats.getDFModifiers()[0].value = stat.value.toInt()
                "MA-MOD" -> player.baseStats.getMAModifiers()[0].value = stat.value.toInt()
                "MD-MOD" -> player.baseStats.getMDModifiers()[0].value = stat.value.toInt()
            }
            // update document visuals
            player.baseStats.updateCombat()
            (document.getElementById("AT-BASE") as HTMLTableCellElement).innerText = player.baseStats.getAT(false).toString()
            (document.getElementById("DF-BASE") as HTMLTableCellElement).innerText = player.baseStats.getDF(false).toString()
            (document.getElementById("MA-BASE") as HTMLTableCellElement).innerText = player.baseStats.getMA(false).toString()
            (document.getElementById("MD-BASE") as HTMLTableCellElement).innerText = player.baseStats.getMD(false).toString()

            (document.getElementById("AT-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getAT().toString()
            (document.getElementById("DF-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getDF().toString()
            (document.getElementById("MA-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getMA().toString()
            (document.getElementById("MD-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getMD().toString()

            (document.getElementById("STR-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getSTR().toString()
            (document.getElementById("CON-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getCON().toString()
            (document.getElementById("INT-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getINT().toString()
            (document.getElementById("WILL-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getWIL().toString()
            (document.getElementById("SPD-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getSPD().toString()
            (document.getElementById("AC-TOTAL") as HTMLTableCellElement).innerText = player.baseStats.getACC().toString()
        }
    })
}
fun initEquipmentListener(player: Player) {
    document.addEventListener("change", {
        val equipment = it.target
        if (equipment is HTMLTextAreaElement) {
            when (equipment.id) {
                "weapon" -> player.weapon.getEquipmentData().description = equipment.value
                "armor" -> player.armor.getEquipmentData().description = equipment.value
                "accessory" -> player.accessory.getEquipmentData().description = equipment.value
            }
        }
    })
}
fun initInventoryListener(player: Player) {
    val gold = document.getElementById("gold__textarea") as HTMLTextAreaElement
    gold.addEventListener("change", {
        player.inventory.setGold(gold.value.toInt())
    })
    val bagType = document.getElementById("bag-type__textarea") as HTMLTextAreaElement
    bagType.addEventListener("change", {
        player.inventory.setBagType(bagType.value)
    })
    val notes = document.getElementById("notes-div__textarea") as HTMLTextAreaElement
    notes.addEventListener("change", {
        player.inventory.setNotes(notes.value)
    })
}



fun initNavigationBar(player: Player) {
    (document.getElementById("main-navbar__icon__save-button") as HTMLButtonElement).onclick = { FileHandler.save(player) }
    (document.getElementById("main-navbar__icon__load-button") as HTMLButtonElement).onclick = { FileHandler.load(player) }
}
fun initButtons(player: Player) {
    // initialize add buttons to insert a row
    (document.getElementById("spells-div__button-add") as HTMLButtonElement).onclick = { insertSpellSlot(player.abilities) }
    (document.getElementById("special-div__button-add") as HTMLButtonElement).onclick = { insertSpecialSlot(player.abilities) }
    (document.getElementById("class-abilities-div__button-add") as HTMLButtonElement).onclick = { insertClassSlot(player.abilities) }

    // initialize delete buttons to remove a row
    (document.getElementById("spells-div__button-del")   as HTMLButtonElement).onclick = { deleteSpellSlot(player.abilities) }
    (document.getElementById("special-div__button-del") as HTMLButtonElement).onclick = { deleteSpecialSlot(player.abilities) }
    (document.getElementById("class-abilities-div__button-del")   as HTMLButtonElement).onclick = { deleteClassSlot(player.abilities) }

    // initialize inventory buttons
    (document.getElementById("inventory-div__button-add") as HTMLButtonElement).onclick = { insertItemSlot(player.inventory) }
    (document.getElementById("inventory-div__button-del") as HTMLButtonElement).onclick = { deleteItemSlot(player.inventory) }

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
            "AT" -> player.baseStats.getAT().toString()
            "DF" -> player.baseStats.getDF().toString()
            "MA" -> player.baseStats.getMA().toString()
            "MD" -> player.baseStats.getMD().toString()
            "STR" -> player.baseStats.getSTR().toString()
            "CON" -> player.baseStats.getCON().toString()
            "INT" -> player.baseStats.getINT().toString()
            "WILL"-> player.baseStats.getWIL().toString()
            "SPD" -> player.baseStats.getSPD().toString()
            "AC"  -> player.baseStats.getACC().toString()
            else -> player.baseStats.getAT().toString()
        }
    })
}
fun initSlots(player: Player, spellSlots: Int, specialSlots: Int, classSlots: Int) {
    repeat(spellSlots) { insertSpellSlot(player.abilities) }
    repeat(specialSlots) { insertSpecialSlot(player.abilities) }
    repeat(classSlots) { insertClassSlot(player.abilities) }
}
fun initSkills(player: Player) {
    val table = document.getElementById("skill-tree") as HTMLTableElement
    var index = 0
    while (index < player.skills.getSkillList().size) {
        // add row
        val row = table.insertRow()

        // two skills per row
        repeat(2) {
            val skillName = player.skills.getSkillList()[index].name
            // first cell - skill name
            val label = row.insertCell()
            label.addClass("skill-tree__label")
            label.innerText = skillName

            // second cell - skill number
            val value = row.insertCell()
            val input = document.createElement("input") as HTMLInputElement
            input.type = "number"
            input.name = "skill-number"
            input.id = "$skillName-Value"
            input.placeholder = "0"
            input.addClass("skill-tree__number")
            input.addEventListener("change", {
                player.skills.getSkill(skillName)!!.value.base = (it.target as HTMLInputElement).value.toInt()
            })
            value.appendChild(input)

            // third cell - skill checkbox
            val check = row.insertCell()
            check.addClass("skill-tree__td-checkbox")
            val checkbox = document.createElement("input") as HTMLInputElement
            checkbox.type = "checkbox"
            checkbox.name = "roll-check"
            checkbox.id = "$skillName-Check"
            checkbox.addClass("skill-tree__checkbox")
            checkbox.addEventListener("change", {
                player.skills.getSkill(skillName)!!.check = checkbox.checked
            })
            check.appendChild(checkbox)

            // update index
            index++
        }
    }
}
fun initItems(player: Player, amount: Int) {
    repeat(amount) {
        insertItemSlot(player.inventory)
    }
}


fun insertSpellSlot(
        abilities: Abilities,
        spell: Spell = Spell(),
        image: String = "Spell-Circle-Icon-Web-Dev80px.png"
): Boolean {
    abilities.getSpellList().add(spell)
    return insertAbilitySlot(abilities, "spells", image, abilities.getSpellList().size)
}
fun insertSpecialSlot(
        abilities: Abilities,
        special: Special = Special(),
        image: String = "Triangle Icon - Web Dev.png"
): Boolean {
    abilities.getSpecialList().add(special)
    return insertAbilitySlot(abilities, "special", image, abilities.getSpecialList().size)
}
fun insertClassSlot(
        abilities: Abilities,
        classAbility: ClassAbility = ClassAbility(),
        image: String = "class-abilities-demigod100px.png"
): Boolean {
    abilities.getClassAbilityList().add(classAbility)
    return insertAbilitySlot(abilities, "class-abilities", image, abilities.getClassAbilityList().size)
}
fun insertAbilitySlot(
        abilities: Abilities,
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
            "spells" -> abilities.getSpellList()[size-1].description = (it.target as HTMLTextAreaElement).value
            "special" -> abilities.getSpecialList()[size-1].description = (it.target as HTMLTextAreaElement).value
            "class-abilities" -> abilities.getClassAbilityList()[size-1].description = (it.target as HTMLTextAreaElement).value
        }
    })

    // finally append
    text.appendChild(textarea)

    // "false" keeps page from refreshing on button press
    return false
}
fun deleteSpellSlot(abilities: Abilities): Boolean {

    val table = document.getElementById("spells-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    abilities.getSpellList().removeAt(abilities.getSpellList().size -1)
    return false
}
fun deleteSpecialSlot(abilities: Abilities): Boolean {
    val table = document.getElementById("special-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    abilities.getSpecialList().removeAt(abilities.getSpecialList().size -1)
    return false
}
fun deleteClassSlot(abilities: Abilities): Boolean {
    val table = document.getElementById("class-abilities-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    abilities.getClassAbilityList().removeAt(abilities.getClassAbilityList().size -1)
    return false
}



fun insertItemSlot(inventory: Inventory, item: Item = Item()): Boolean {
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

    row.insertCell().appendChild(createItemSlot(inventory, item))

    // "false" keeps page from refreshing on button press
    return false
}
fun createItemSlot(inventory: Inventory, item: Item): HTMLTextAreaElement {
    // update player
    inventory.addItem(item)

    // create textarea cell
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.name = "inventory-slot"
    textarea.addClass("inventory-div__slot")
    textarea.id = "inventory-slot-" + inventory.getSize()

    // add EventListener
    val index = inventory.getSize()-1
    textarea.addEventListener("change", {
        // index must be declared outside the eventListener to stay constant
        inventory.getItem(index).description = (it.target as HTMLTextAreaElement).value
    })

    return textarea
}
fun deleteItemSlot(inventory: Inventory): Boolean {
    // update player, cancel out if 0
    if (inventory.getSize() == 0) {
        return false
    }

    inventory.removeLastItem()

    val table = document.getElementById("inventory-div__slot-table") as HTMLTableElement
    val row = table.rows[table.rows.length-1] as HTMLTableRowElement

    // if there is only one cell in the table...
    if (row.cells.length == 1) {
        table.deleteRow(table.rows.length-1)
    } else if (row.cells.length == 3) {
        row.deleteCell(row.cells.length-1)
    }
    // If we want to delete the 2nd cell, we need do something a bit weird.
    // This is due to a visual bug; only deleting the cell results in the border not leaving.
    else {
        val item = inventory.removeLastItem() // remove item in FIRST cell and SAVE it
        table.deleteRow(table.rows.length-1) // delete entire row
        insertItemSlot(inventory, item)             // create new row/cell and replace the FIRST item

        // update document value
        val size = inventory.getSize()
        (document.getElementById("inventory-slot-$size") as HTMLTextAreaElement).value = inventory.getItem(size-1).description
    }

    // "false" keeps page from refreshing on button press
    return false
}