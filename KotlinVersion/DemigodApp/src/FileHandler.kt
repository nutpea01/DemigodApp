import org.khronos.webgl.ArrayBuffer
import org.w3c.dom.*
import org.w3c.files.Blob
import org.w3c.files.FileReader
import org.w3c.files.get
import kotlin.browser.document
import kotlin.js.Json
import kotlin.reflect.typeOf
import kotlin.js.iterator

object FileHandler {
    var fileID: Int = 0

    fun save(player: Player) {
        val name = player.traits.getName()
        val clazz = player.traits.getClassName()
        val file = "$name-$clazz.demi"

        var text = "{"
        text += "\"traits\":" + JSON.stringify(player.traits.getData()) + ","
        text += "\"resources\":" + JSON.stringify(player.resources.getData()) + ","
        text += "\"baseStats\":" + JSON.stringify(player.baseStats.getData()) + ","
        text += "\"combatStats\":" + JSON.stringify(player.baseStats.getCombatStats()) + ","
        text += "\"weapon\":" + JSON.stringify(player.weapon.getData()) + ","
        text += "\"armor\":" + JSON.stringify(player.armor.getData()) + ","
        text += "\"accessory\":" + JSON.stringify(player.accessory.getData()) + ","

        /*
        text += "\"skills\": {"
        val skills = document.getElementsByClassName("skill-tree__number")
        repeat(skills.length) {
            val skill = skills[it] as HTMLInputElement
            text += JSON.stringify(skill.value) + ","
        }
        text += "}"
        */
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
        //val resources = Resources()
        //val baseStats = BaseStats()
        //val skills: MutableList<Skill> = mutableListOf()
        //val weapon = Weapon()
        //val armor = Armor()
        //val accessory = Accessory()
        //val spells: MutableList<Spell> = mutableListOf()
        //val specials: MutableList<Special> = mutableListOf()
        //val classAbilities: MutableList<ClassAbility> = mutableListOf()
        //val inventory = Inventory()

        /*
        js("""
            player.traits.name = json['traits'].name
            player.traits.age = json['traits'].age
            player.traits.species = json['traits'].species
            player.traits._class.name = json['traits']._class.name
            player.traits.level = json['traits'].level
            
            player.resources.hp
        """)
        */
        player.traits.setData(json["traits"].unsafeCast<Traits.TraitsData>())

        /*
        val skills = document.getElementsByClassName("skill-tree__number")
        repeat(skills.length) {
            val skill = skills[it] as HTMLInputElement
            player.skills.getSkillList()[it].value.setBase(skill.value.toInt())
        }
        */

        player.resources.setData(json["resources"].unsafeCast<Resources.ResourcesData>())
        player.baseStats.setData(json["baseStats"].unsafeCast<BaseStats.BaseStatsData>())
        player.baseStats.setCombatStats(json["combatStats"].unsafeCast<BaseStats.CombatStats>())

        player.weapon.setData(json["weapon"].unsafeCast<Wearable.WearableData>())
        player.armor.setData(json["armor"].unsafeCast<Wearable.WearableData>())
        player.accessory.setData(json["accessory"].unsafeCast<Wearable.WearableData>())

        player.skills.setSkillList(json["skills"].unsafeCast<MutableList<Skills.SkillData>>())

        player.abilities.setSpellList(json["spells"].unsafeCast<MutableList<Spell>>())
        player.abilities.setSpecialList(json["spells"].unsafeCast<MutableList<Special>>())
        player.abilities.setClassAbilityList(json["spells"].unsafeCast<MutableList<ClassAbility>>())

        player.inventory.setData(json["inventory"].unsafeCast<Inventory.InventoryData>())

        updateDocument(player)
    }
    private fun updateDocument(player: Player) {
        resetPage(player)
        (document.getElementById("Name") as HTMLInputElement).value = player.traits.getName()
        (document.getElementById("Age") as HTMLInputElement).value = player.traits.getAge().toString()
        (document.getElementById("Species") as HTMLInputElement).value = player.traits.getSpecies()
        (document.getElementById("Class") as HTMLInputElement).value = player.traits.getClassName()
        (document.getElementById("Level") as HTMLInputElement).value = player.traits.getLevel().toString()

        console.log(player.resources.getCurrentHP())
        console.log(player.resources.getCurrentMP())
        console.log(player.resources.getCurrentSP())
        console.log(player.resources.getMaxHP())
        console.log(player.resources.getMaxMP())
        console.log(player.resources.getMaxSP())
        console.log(js("player.resources.getMaxHPModifiers()[0].value"))
        console.log(js("player.resources.getMaxMPModifiers()[0].value"))
        console.log(js("player.resources.getMaxSPModifiers()[0].value"))

        console.log(player.baseStats.getSTR())
        console.log(player.baseStats.getCON())
        console.log(player.baseStats.getINT())
        console.log(player.baseStats.getWIL())
        console.log(player.baseStats.getSPD())
        console.log(player.baseStats.getACC())
        console.log(js("player.baseStats.getSTRModifiers()[0].value"))
        console.log(js("player.baseStats.getCONModifiers()[0].value"))
        console.log(js("player.baseStats.getINTModifiers()[0].value"))
        console.log(js("player.baseStats.getWILModifiers()[0].value"))
        console.log(js("player.baseStats.getSPDModifiers()[0].value"))
        console.log(js("player.baseStats.getACCModifiers()[0].value"))
        console.log(player.baseStats.getAT())
        console.log(player.baseStats.getDF())
        console.log(player.baseStats.getMA())
        console.log(player.baseStats.getMD())
        console.log(js("player.baseStats.getATModifiers()[0].value"))
        console.log(js("player.baseStats.getDFModifiers()[0].value"))
        console.log(js("player.baseStats.getMAModifiers()[0].value"))
        console.log(js("player.baseStats.getMDModifiers()[0].value"))

        console.log(player.weapon.description)
        console.log(player.armor.description)
        console.log(player.accessory.description)

        console.log(player.skills.getSkillList())
        repeat((player.skills.getSkillList() as Array<Skills.SkillData>).size) {
            val skill = player.skills.getSkillList()[it]
            console.log("1" + skill.name + " " + skill.value + " " + skill.check)
        }
        repeat(player.abilities.getSpellList().size) {
            val spell = player.abilities.getSpellList()[it]
            console.log(spell.description)
        }
        repeat(player.abilities.getSpecialList().size) {
            val special = player.abilities.getSpecialList()[it]
            console.log(special.description)
        }
        repeat(player.abilities.getClassAbilityList().size) {
            val classAbility = player.abilities.getClassAbilityList()[it]
            console.log(classAbility.description)
        }

        repeat(player.inventory.getItems().size) {
            val item = player.inventory.getItems()[it]
            console.log(item.description)
        }
        console.log(player.inventory.getGold())
        console.log(player.inventory.getBagType())
        console.log(player.inventory.getNotes())

    }
}