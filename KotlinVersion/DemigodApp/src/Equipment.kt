open class Equipment(
    var name: String = "",
    var description: String = ""
) {
    val id: String = generateID()
    val modifiers: MutableList<Modifier> = mutableListOf()
    var icon: Int = 0
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
            if (aug.id == ID) {
                return aug
            }
        }
        return Augment()
    }
    fun geGlyphByID(ID: String): Glyph {
        for (gly in this.data.glyphs) {
            if (gly.id == ID) {
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
    fun setData(data: WearableData) {
        this.data = data
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