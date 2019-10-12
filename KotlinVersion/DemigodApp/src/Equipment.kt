open class Equipment {
    private var data: EquipmentData = EquipmentData()

    fun getEquipmentData(): EquipmentData {
        return this.data
    }

    fun setEquipmentData(data: EquipmentData) {
        this.data = data
    }

    data class EquipmentData(
            var name: String = "",
            var description: String = "",
            var icon: Int = 0
    ) {
        val id: String = generateID()
        var modifiers: Array<Modifier> = arrayOf(
                Modifier(), Modifier(), Modifier(), Modifier(), Modifier(),
                Modifier(), Modifier(), Modifier(), Modifier(), Modifier(),
                Modifier(), Modifier(), Modifier(), Modifier(), Modifier(),
                Modifier(), Modifier(), Modifier(), Modifier(), Modifier()
        )
    }
}

open class Wearable: Equipment() {
    private var data: WearableData = WearableData(0)

    init {
        linkAugSlots()
    }

    fun getAugmentSlots(): Int { return this.data.augmentSlots }
    fun addAugmentSlot() {
        this.data.augmentSlots++
        linkAugSlots()
    }
    fun equipAugment(augment: Augment) {
        var i = 0
        while (i < this.data.augments.size) {
            if (this.data.augments[i] == Augment()) {
                this.data.augments[i] = augment
                return
            }
            i++
        }
    }
    private fun linkAugSlots() {
        while (this.data.augments.size < this.data.augmentSlots) {
            this.data.augments.add(Augment())
        }
    }
    fun getAugmentByID(ID: String): Augment {
        for (aug in this.data.augments) {
            if (aug.getEquipmentData().id == ID) {
                return aug
            }
        }
        return Augment()
    }
    fun geGlyphByID(ID: String): Glyph {
        for (gly in this.data.glyphs) {
            if (gly.getEquipmentData().id == ID) {
                return gly
            }
        }
        return Glyph()
    }
    //TODO: getAbility
    fun getAbiltyByID(ID: String): Ability {
        return Ability()
    }

    data class WearableData (
            var augmentSlots: Int = 0
    ) {
        val augments: MutableList<Augment> = mutableListOf()
        val glyphs: MutableList<Glyph> = mutableListOf()
        val abilities: MutableList<Ability> = mutableListOf()
    }
    fun getData(): WearableData {
        return this.data
    }
    fun setData(augmentList: Array<Augment>, glyphList: Array<Glyph>, abilityList: Array<Ability>) {
        setAugments(augmentList)
        setGlyphs(glyphList)
        setAbilities(abilityList)
    }
    fun setAugments(list: Array<Augment>) {
        this.data.augments.clear()
        for (augment in list) { this.data.augments.add(augment) }
        linkAugSlots()
    }
    fun setGlyphs(list: Array<Glyph>) {
        this.data.glyphs.clear()
        for (glyph in list) { this.data.glyphs.add(glyph) }
    }
    fun setAbilities(list: Array<Ability>) {
        this.data.abilities.clear()
        for (ability in list) { this.data.abilities.add(ability) }
    }
}

open class Upgrade: Equipment() {
    var isAbility: Boolean = false
    var effect: Ability = Ability()
}

class Glyph: Upgrade()
class Augment: Upgrade()

class Weapon: Wearable()
class Armor: Wearable()
class Accessory: Wearable()