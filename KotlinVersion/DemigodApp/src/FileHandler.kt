import org.khronos.webgl.ArrayBuffer
import org.w3c.dom.*
import org.w3c.files.Blob
import org.w3c.files.FileReader
import org.w3c.files.get
import kotlin.browser.document
import kotlin.js.Json
import kotlin.reflect.typeOf

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
    }
}