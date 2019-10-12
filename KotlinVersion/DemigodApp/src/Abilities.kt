open class Ability (
    var name: String = "",
    var description: String = ""
) {
    val id: String = generateID()
    var icon: Int = 0
}

class Spell: Ability()
class Special: Ability()
class ClassAbility: Ability()

class Abilities {
    private val spellList: MutableList<Spell> = mutableListOf()
    private val specialList: MutableList<Special> = mutableListOf()
    private val classAbilityList: MutableList<ClassAbility> = mutableListOf()

    fun getSpellList(): MutableList<Spell> {
        return this.spellList
    }
    fun getSpecialList(): MutableList<Special> {
        return this.specialList
    }
    fun getClassAbilityList(): MutableList<ClassAbility> {
        return this.classAbilityList
    }

    fun setSpellList(list: Array<Spell>) {
        this.spellList.clear()
        for (spell in list) {
            insertSpellSlot(this, spell)
        }
    }
    fun setSpecialList(list: Array<Special>) {
        this.specialList.clear()
        for (special in list) {
            insertSpecialSlot(this, special)
        }
    }
    fun setClassAbilityList(list: Array<ClassAbility>)  {
        this.classAbilityList.clear()
        for (classAbility in list) {
            insertClassSlot(this, classAbility)
        }
    }
}