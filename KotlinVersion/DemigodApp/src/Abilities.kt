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
