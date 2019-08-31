import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass

fun initCharacterSheetListeners(player: Player) {
    initTraitListener(player)
    initResourceListener(player)
    initStatListener(player)
    initEquipmentListener(player)
    initAbilityListener(player)
    initItemListener(player)
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
        val resource = (it.target as HTMLInputElement).value.toInt()
        when ((it.target as HTMLInputElement).id) {
            "currentHP" -> player.resources.setCurrentHP(resource)
            "currentMP" -> player.resources.setCurrentMP(resource)
            "currentSP" -> player.resources.setCurrentSP(resource)
            "maxHP" -> player.resources.setMaxHP(resource)
            "maxMP" -> player.resources.setMaxMP(resource)
            "maxSP" -> player.resources.setMaxSP(resource)
            "maxHP-MOD" -> player.resources.getMaxHPModifiers()[0].value = resource
            "maxMP-MOD" -> player.resources.getMaxMPModifiers()[0].value = resource
            "maxSP-MOD" -> player.resources.getMaxSPModifiers()[0].value = resource
        }

        // update document visuals
        (document.getElementById("maxHP") as HTMLInputElement).value = player.resources.getMaxHP().toString()
        (document.getElementById("maxMP") as HTMLInputElement).value = player.resources.getMaxMP().toString()
        (document.getElementById("maxSP") as HTMLInputElement).value = player.resources.getMaxSP().toString()
    })
}
fun initStatListener(player: Player) {
    document.addEventListener("change", {
        val stat = (it.target as HTMLInputElement).value.toInt()
        when ((it.target as HTMLInputElement).id) {
            "STR" -> player.baseStats.setSTR(stat)
            "CON" -> player.baseStats.setCON(stat)
            "INT" -> player.baseStats.setINT(stat)
            "WILL"-> player.baseStats.setWIL(stat)
            "SPD" -> player.baseStats.setSPD(stat)
            "AC"  -> player.baseStats.setACC(stat)

            //"AT" -> player.baseStats.combatStats.setATBase(stat)
            //"DF" -> player.baseStats.combatStats.setDFBase(stat)
            //"MA" -> player.baseStats.combatStats.setMABase(stat)
            //"MD" -> player.baseStats.combatStats.setMDBase(stat)

            "STR-MOD" -> player.baseStats.getSTRModifiers()[0].value = stat
            "CON-MOD" -> player.baseStats.getCONModifiers()[0].value = stat
            "INT-MOD" -> player.baseStats.getINTModifiers()[0].value = stat
            "WILL-MOD"-> player.baseStats.getWILModifiers()[0].value = stat
            "SPD-MOD" -> player.baseStats.getSPDModifiers()[0].value = stat
            "AC-MOD"  -> player.baseStats.getACCModifiers()[0].value = stat

            "AT-MOD" -> player.baseStats.combatStats.getATModifiers()[0].value = stat
            "DF-MOD" -> player.baseStats.combatStats.getDFModifiers()[0].value = stat
            "MA-MOD" -> player.baseStats.combatStats.getMAModifiers()[0].value = stat
            "MD-MOD" -> player.baseStats.combatStats.getMDModifiers()[0].value = stat
        }
        // update document visuals
        player.baseStats.updateCombat()
        (document.getElementById("AT") as HTMLInputElement).value = player.baseStats.combatStats.getAT().toString()
        (document.getElementById("DF") as HTMLInputElement).value = player.baseStats.combatStats.getDF().toString()
        (document.getElementById("MA") as HTMLInputElement).value = player.baseStats.combatStats.getMA().toString()
        (document.getElementById("MD") as HTMLInputElement).value = player.baseStats.combatStats.getMD().toString()

        (document.getElementById("STR") as HTMLInputElement).value = player.baseStats.getSTR().toString()
        (document.getElementById("CON") as HTMLInputElement).value = player.baseStats.getCON().toString()
        (document.getElementById("INT") as HTMLInputElement).value = player.baseStats.getINT().toString()
        (document.getElementById("WILL") as HTMLInputElement).value = player.baseStats.getWIL().toString()
        (document.getElementById("SPD") as HTMLInputElement).value = player.baseStats.getSPD().toString()
        (document.getElementById("AC") as HTMLInputElement).value = player.baseStats.getACC().toString()
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
fun initAbilityListener(player: Player) {
    //TODO: used to init the default 3 - search for a better option.
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
fun initItemListener(player: Player) {
    //TODO: used to init the default 3 - search for a better option.
    repeat(3) {
        val textarea = document.getElementById("inventory-slot-" + (it+1)) as HTMLTextAreaElement
        val index = it
        textarea.addEventListener("change", {
            player.inventory.getItem(index).description = (it.target as HTMLTextAreaElement).value
        })
    }
}



fun initNavigationBar(player: Player) {
    (document.getElementById("main-navbar__icon__save-button") as HTMLButtonElement).onclick = { FileHandler.save("test", player) }
    (document.getElementById("main-navbar__icon__load-button") as HTMLButtonElement).onclick = { FileHandler.load() }
}
fun initSlotButtons(player: Player) {
    // initialize add buttons to insert a row
    (document.getElementById("spells-div__button-add") as HTMLButtonElement).onclick = { insertSpellSlot(player) }
    (document.getElementById("special-div__button-add") as HTMLButtonElement).onclick = { insertSpecialSlot(player) }
    (document.getElementById("class-abilities-div__button-add") as HTMLButtonElement).onclick = { insertClassSlot(player) }
    (document.getElementById("inventory-div__button-add") as HTMLButtonElement).onclick = { insertItemSlot(player) }

    // initialize delete buttons to remove a row
    (document.getElementById("spells-div__button-del")   as HTMLButtonElement).onclick = { deleteSpellSlot(player) }
    (document.getElementById("special-div__button-del") as HTMLButtonElement).onclick = { deleteSpecialSlot(player) }
    (document.getElementById("class-abilities-div__button-del")   as HTMLButtonElement).onclick = { deleteClassSlot(player) }
    (document.getElementById("inventory-div__button-del") as HTMLButtonElement).onclick = { deleteItemSlot(player) }
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


fun insertSpellSlot(player: Player): Boolean {
    return insertAbilitySlot(player, "spells", "Spell-Circle-Icon-Web-Dev80px.png")
}
fun insertSpecialSlot(player: Player): Boolean {
    return insertAbilitySlot(player, "special", "Triangle Icon - Web Dev.png")
}
fun insertClassSlot(player: Player): Boolean {
    return insertAbilitySlot(player, "class-abilities", "class-abilities-demigod100px.png")
}
fun insertAbilitySlot(player: Player, type: String, image: String = "Hold Primary Logo 240px.png"): Boolean {
    // access table and create new row
    val table = document.getElementById("$type-div__table") as HTMLTableElement
    val row = table.insertRow()

    // create icon cell (first)
    val icon = row.insertCell(0)
    icon.addClass("$type-div__td-image")
    val img = document.createElement("img") as HTMLImageElement
    img.addClass("$type-div__image")
    img.src = image
    icon.appendChild(img)

    // create text cell (second)
    val text = row.insertCell(1)
    text.addClass("$type-div__td-textarea")
    val textarea = document.createElement("textarea") as HTMLTextAreaElement
    textarea.addClass("$type-div__textarea")
    text.appendChild(textarea)

    //update player and table element IDs
    when (type) {
        "spells" -> {
            player.spells.add(Spell())
            img.id =  "$type-img" + player.spells.size.toString()
            textarea.id =  "$type-textarea-" + player.spells.size.toString()
            val index = player.spells.size-1
            textarea.addEventListener("change", {
                // index must be declared outside the eventListener to stay constant
                player.spells[index].description = (it.target as HTMLTextAreaElement).value
            })
        }
        "special" -> {
            player.specials.add(Special())
            img.id =  "$type-img" + player.specials.size.toString()
            textarea.id =  "$type-textarea-" + player.specials.size.toString()
            val index = player.specials.size-1
            textarea.addEventListener("change", {
                // index must be declared outside the eventListener to stay constant
                player.specials[index].description = (it.target as HTMLTextAreaElement).value
            })
        }
        "class-abilities" -> {
            player.classAbilities.add(ClassAbility())
            img.id =  "$type-img" + player.classAbilities.size.toString()
            textarea.id =  "$type-textarea-" + player.classAbilities.size.toString()
            val index = player.classAbilities.size-1
            textarea.addEventListener("change", {
                // index must be declared outside the eventListener to stay constant
                player.classAbilities[index].description = (it.target as HTMLTextAreaElement).value
            })
        }
    }

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
    player.specials.removeAt(player.spells.size -1)
    return false
}
fun deleteClassSlot(player: Player): Boolean {
    val table = document.getElementById("class-abilities-div__table") as HTMLTableElement
    table.deleteRow(table.rows.length-1)
    player.classAbilities.removeAt(player.spells.size -1)
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
    // update player
    if (player.inventory.size > 0) {
        player.inventory.removeLastItem()
    }

    val table = document.getElementById("inventory-div__slot-table") as HTMLTableElement
    // check for empty table exception
    if (table.rows.length == 0) return false

    // else, assign "row" as last row in table
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