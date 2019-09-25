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
    private var spellList: Array<Spell> = arrayOf()
    private var specialList: Array<Special> = arrayOf()
    private var classAbilityList: Array<ClassAbility> = arrayOf()

    fun getSpellList(): Array<Spell> {
        return this.spellList
    }
    fun getSpecialList(): Array<Special> {
        return this.specialList
    }
    fun getClassAbilityList(): Array<ClassAbility> {
        return this.classAbilityList
    }

    fun setSpellList(list: Array<Spell>) {
        this.spellList = list
    }
    fun setSpecialList(list: Array<Special>) {
        this.specialList = list
    }
    fun setClassAbilityList(list: Array<ClassAbility>)  {
        this.classAbilityList = list
    }
}