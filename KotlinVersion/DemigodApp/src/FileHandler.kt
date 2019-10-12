import org.khronos.webgl.ArrayBuffer
import org.w3c.dom.*
import org.w3c.files.Blob
import org.w3c.files.FileReader
import org.w3c.files.get
import kotlin.browser.document
import kotlin.collections.Map.*
import kotlin.coroutines.CoroutineContext
import kotlin.js.Json
import kotlin.reflect.typeOf
import kotlin.js.iterator

object FileHandler {
    var fileID: Int = 0

    fun save(player: Player) {
        val playerName = player.traits.getName()
        val clazz = player.traits.getClassName()
        val file = "$playerName-$clazz.demi"

        var text = "{"
        text += "\"traits\":" + JSON.stringify(player.traits.getData()) + ","
        text += "\"resources\":" + JSON.stringify(player.resources.getData()) + ","
        text += "\"baseStats\":" + JSON.stringify(player.baseStats.getData()) + ","
        text += "\"combatStats\":" + JSON.stringify(player.baseStats.getCombatStats()) + ","

        text += "\"weaponE\":" + JSON.stringify(player.weapon.getEquipmentData()) + ","
        text += "\"weaponW\":" + JSON.stringify(player.weapon.getData()) + ","
        text += "\"armorE\":" + JSON.stringify(player.armor.getEquipmentData()) + ","
        text += "\"armorW\":" + JSON.stringify(player.armor.getData()) + ","
        text += "\"accessoryE\":" + JSON.stringify(player.accessory.getEquipmentData()) + ","
        text += "\"accessoryW\":" + JSON.stringify(player.accessory.getData()) + ","

        text += "\"skills\":" + JSON.stringify(player.skills.getSkillList()) + ","

        text += "\"spells\":" + JSON.stringify(player.abilities.getSpellList()) + ","
        text += "\"specials\":" + JSON.stringify(player.abilities.getSpecialList()) + ","
        text += "\"classAbilities\":" + JSON.stringify(player.abilities.getClassAbilityList()) + ","
        text += "\"inventory\":" + JSON.stringify(player.inventory.getData())
        text += "}"

        // create hyperlink and set it's href and text "defined above"
        val save = document.createElement("a") as HTMLAnchorElement
        save.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))

        // set save as a download and prevent display
        save.setAttribute("download", file)
        save.style.display = "none"

        // add save, click it, and remove it
        document.body!!.appendChild(save)
        save.click()
        document.body!!.removeChild(save)
    }
    fun load(player: Player) {
        // create load input element and assign attributes
        val load = document.createElement("input") as HTMLInputElement
        load.id = "load-file"
        load.type = "file"
        load.style.display = "none"

        // add load element and click it
        document.body!!.appendChild(load)
        load.click()

        fileID = setInterval({
            // wait until file is selected
            if (load.value != "") {
                readLoadedFile(load, player)
            }
            return@setInterval null
        }, 10)

        // remove from document afterward
        document.body!!.removeChild(load)
    }

    private fun readLoadedFile(load: HTMLInputElement, player: Player) {
        clearInterval(fileID)
        val file = load.files!![0]

        // set up file reader
        val fileReader = FileReader()
        fileReader.onerror = { throw error("error reading file") }
        fileReader.readAsText(file as Blob)
        fileReader.onloadend = {
            val json = JSON.parse<Json>(fileReader.result as String)
            assignLoadedData(json, player)

        }
    }

    private fun assignLoadedData(json: Json, player: Player) {
        // reset page and player to default before replacing data
        resetPage(player)

        // assign data and update sheet
        assignTraits(json, player)
        assignResources(json, player)
        assignStats(json, player)
        assignEquipment(json, player)
        assignSkills(json, player)
        assignAbilities(json, player)
        assignInventory(json, player)
    }

    private fun assignTraits(json: Json, player: Player) {
        player.traits.setData(json["traits"].unsafeCast<Traits.TraitsData>())
        // input data to sheet
        (document.getElementById("Name") as HTMLInputElement).value = player.traits.getName()
        (document.getElementById("Age") as HTMLInputElement).value = player.traits.getAge().toString()
        (document.getElementById("Species") as HTMLInputElement).value = player.traits.getSpecies()
        (document.getElementById("Class") as HTMLInputElement).value = player.traits.getClassName()
        (document.getElementById("Level") as HTMLInputElement).value = player.traits.getLevel().toString()
        //TODO: icon, doesn't need to be int
        //(document.getElementById("Icon") as HTMLInputElement).value = player.traits.getIcon.toString()
    }
    private fun assignResources(json: Json, player: Player) {
        player.resources.setData(json["resources"].unsafeCast<Resources.ResourcesData>())
        // input data to sheet
        (document.getElementById("currentHP") as HTMLInputElement).value = player.resources.getCurrentHP().toString()
        (document.getElementById("currentMP") as HTMLInputElement).value = player.resources.getCurrentMP().toString()
        (document.getElementById("currentSP") as HTMLInputElement).value = player.resources.getCurrentSP().toString()
        (document.getElementById("maxHP") as HTMLInputElement).value = player.resources.getMaxHP().toString()
        (document.getElementById("maxMP") as HTMLInputElement).value = player.resources.getMaxMP().toString()
        (document.getElementById("maxSP") as HTMLInputElement).value = player.resources.getMaxSP().toString()
        (document.getElementById("maxHP-MOD") as HTMLInputElement).value = player.resources.getMaxHPModifiers()[0].value.toString()
        (document.getElementById("maxMP-MOD") as HTMLInputElement).value = player.resources.getMaxMPModifiers()[0].value.toString()
        (document.getElementById("maxSP-MOD") as HTMLInputElement).value = player.resources.getMaxSPModifiers()[0].value.toString()
    }
    private fun assignStats(json: Json, player: Player) {
        player.baseStats.setData(json["baseStats"].unsafeCast<BaseStats.BaseStatsData>())
        player.baseStats.setCombatStats(json["combatStats"].unsafeCast<BaseStats.CombatStats>())
        // input data to sheet
        (document.getElementById("STR-BASE" ) as HTMLInputElement).value = player.baseStats.getSTR().toString()
        (document.getElementById("CON-BASE" ) as HTMLInputElement).value = player.baseStats.getCON().toString()
        (document.getElementById("INT-BASE" ) as HTMLInputElement).value = player.baseStats.getINT().toString()
        (document.getElementById("WILL-BASE") as HTMLInputElement).value = player.baseStats.getWIL().toString()
        (document.getElementById("SPD-BASE" ) as HTMLInputElement).value = player.baseStats.getSPD().toString()
        (document.getElementById("AC-BASE"  ) as HTMLInputElement).value = player.baseStats.getACC().toString()
        (document.getElementById("STR-MOD" ) as HTMLInputElement).value = player.baseStats.getSTRModifiers()[0].value.toString()
        (document.getElementById("CON-MOD" ) as HTMLInputElement).value = player.baseStats.getCONModifiers()[0].value.toString()
        (document.getElementById("INT-MOD" ) as HTMLInputElement).value = player.baseStats.getINTModifiers()[0].value.toString()
        (document.getElementById("WILL-MOD") as HTMLInputElement).value = player.baseStats.getWILModifiers()[0].value.toString()
        (document.getElementById("SPD-MOD" ) as HTMLInputElement).value = player.baseStats.getSPDModifiers()[0].value.toString()
        (document.getElementById("AC-MOD"  ) as HTMLInputElement).value = player.baseStats.getACCModifiers()[0].value.toString()
        (document.getElementById("AT-MOD") as HTMLInputElement).value = player.baseStats.getATModifiers()[0].value.toString()
        (document.getElementById("DF-MOD") as HTMLInputElement).value = player.baseStats.getDFModifiers()[0].value.toString()
        (document.getElementById("MA-MOD") as HTMLInputElement).value = player.baseStats.getMAModifiers()[0].value.toString()
        (document.getElementById("MD-MOD") as HTMLInputElement).value = player.baseStats.getMDModifiers()[0].value.toString()

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

        // update document visuals
        player.baseStats.updateCombat()
    }
    private fun assignEquipment(json: Json, player: Player) {
        // TODO: not the best setup, no checking done
        //  not tested - base functionality works, but no lists exist to practically test yet
        player.weapon.setEquipmentData(json["weaponE"].unsafeCast<Equipment.EquipmentData>())
        player.weapon.setData(
                js("json[\"weaponW\"][\"augments\"]"),
                js("json[\"weaponW\"][\"glyphs\"]"),
                js("json[\"weaponW\"][\"abilities\"]")
        )
        player.armor.setEquipmentData(json["armorE"].unsafeCast<Equipment.EquipmentData>())
        player.armor.setData(
                js("json[\"armorW\"][\"augments\"]"),
                js("json[\"armorW\"][\"glyphs\"]"),
                js("json[\"armorW\"][\"abilities\"]")
        )
        player.accessory.setEquipmentData(json["accessoryE"].unsafeCast<Equipment.EquipmentData>())
        player.accessory.setData(
                js("json[\"accessoryW\"][\"augments\"]"),
                js("json[\"accessoryW\"][\"glyphs\"]"),
                js("json[\"accessoryW\"][\"abilities\"]")
        )
        // input data to sheet
        (document.getElementById("weapon") as HTMLTextAreaElement).value = player.weapon.getEquipmentData().description
        (document.getElementById("armor") as HTMLTextAreaElement).value = player.armor.getEquipmentData().description
        (document.getElementById("accessory") as HTMLTextAreaElement).value = player.accessory.getEquipmentData().description
    }
    private fun assignSkills(json: Json, player: Player) {
        // assign Skills
        player.skills.setSkillList(json["skills"].unsafeCast<Array<Skills.SkillData>>())
        // input data to sheet
        repeat(player.skills.getSkillList().size) {
            val skill = player.skills.getSkill(it)
            val name = skill.name
            (document.getElementById("$name-Value") as HTMLInputElement).value = ValueFunctions.getValue(skill.value).toString()
            (document.getElementById("$name-Check") as HTMLInputElement).checked = skill.check
        }
    }
    private fun assignAbilities(json: Json, player: Player) {
        player.abilities.setSpellList(json["spells"].unsafeCast<Array<Spell>>())
        player.abilities.setSpecialList(json["specials"].unsafeCast<Array<Special>>())
        player.abilities.setClassAbilityList(json["classAbilities"].unsafeCast<Array<ClassAbility>>())
        // input data to sheet
        repeat(player.abilities.getSpellList().size) {
            (document.getElementById("spells-textarea-${it+1}") as HTMLTextAreaElement)
                    .value = player.abilities.getSpellList()[it].description
        }
        repeat(player.abilities.getSpecialList().size) {
            (document.getElementById("special-textarea-${it+1}") as HTMLTextAreaElement)
                    .value = player.abilities.getSpecialList()[it].description
        }
        repeat(player.abilities.getClassAbilityList().size) {
            (document.getElementById("class-abilities-textarea-${it+1}") as HTMLTextAreaElement)
                    .value = player.abilities.getClassAbilityList()[it].description
        }
    }
    private fun assignInventory(json: Json, player: Player) {
        //player.inventory.setData(json["inventory"].unsafeCast<Inventory.InventoryData>())
        player.inventory.setData(
                js("json[\"inventory\"][\"gold\"]"),
                js("json[\"inventory\"][\"items\"]"),
                js("json[\"inventory\"][\"bagType\"]"),
                js("json[\"inventory\"][\"notes\"]")
        )
        // input data to sheet
        repeat(player.inventory.getItems().size) {
            (document.getElementById("inventory-slot-${it+1}") as HTMLTextAreaElement)
                    .value = player.inventory.getItem(it).description
        }
        (document.getElementById("gold__textarea") as HTMLTextAreaElement).value = player.inventory.getGold().toString()
        (document.getElementById("bag-type__textarea") as HTMLTextAreaElement).value = player.inventory.getBagType()
        (document.getElementById("notes-div__textarea") as HTMLTextAreaElement).value = player.inventory.getNotes()
    }
}