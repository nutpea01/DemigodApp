open class Ability (
    var name: String = "",
    var description: String = ""
) {
    val id: String = generateID()
    val icon: Int = 0
}

class Spell: Ability()
class Special: Ability()
class ClassAbility: Ability()

class Abilities {
    private var spellList: MutableList<Spell> = mutableListOf()
    private var specialList: MutableList<Special> = mutableListOf()
    private var classAbilityList: MutableList<ClassAbility> = mutableListOf()

    fun getSpellList(): MutableList<Spell> {
        return this.spellList
    }
    fun getSpecialList(): MutableList<Special> {
        return this.specialList
    }
    fun getClassAbilityList(): MutableList<ClassAbility> {
        return this.classAbilityList
    }

    fun setSpellList(list: MutableList<Spell>) {
        this.spellList = list
    }
    fun setSpecialList(list: MutableList<Special>) {
        this.specialList = list
    }
    fun setClassAbilityList(list: MutableList<ClassAbility>)  {
        this.classAbilityList = list
    }
}