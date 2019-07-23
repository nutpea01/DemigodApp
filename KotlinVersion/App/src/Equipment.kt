package demigod.main

open class Equipment(
    val name: String = ""
) {
    val id: String = generateID()
    val modifiers: MutableList<Modifier> = mutableListOf()
}

open class Wearable(
    private var augmentSlots: Int = 0
): Equipment() {
    private val augments: MutableList<Augment> = mutableListOf()
    private val glyphs: MutableList<Glyph> = mutableListOf()
    private val abilities: MutableList<Ability> = mutableListOf()

    init {
        linkAugSlots()
    }

    fun getAugmentSlots(): Int { return this.augmentSlots }
    fun addAugmentSlot() {
        this.augmentSlots++
        linkAugSlots()
    }
    fun equipAugment(augment: Augment) {
        var i = 0
        while (i < this.augments.size) {
            if (this.augments[i] == Augment()) {
                this.augments[i] = augment
                return
            }
            i++
        }
    }
    private fun linkAugSlots() {
        while (this.augments.size < this.augmentSlots) {
            this.augments.add(Augment())
        }
    }
    fun getAugmentByID(ID: String): Augment {
        for (aug in this.augments) {
            if (aug.id == ID) {
                return aug
            }
        }
        return Augment()
    }
    fun geGlyphByID(ID: String): Glyph {
        for (gly in this.glyphs) {
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
}

open class Upgrade: Equipment() {
    val isAbility: Boolean = false
    val effect: Ability = Ability()
}

class Glyph: Upgrade() {}
class Augment: Upgrade() {}

class Weapon: Wearable()
class Armor: Wearable()
class Accessory: Wearable()