class Player {
    val traits = Traits("player", 30, "Human", Class())
    val resources = Resources()
    val baseStats = BaseStats()
    val statChecker = StatChecker(this)
    val weapon: Weapon = Weapon()
    val armor: Armor = Armor()
    val accessory: Accessory = Accessory()
    val spells: MutableList<Spell> = mutableListOf()
    val specials: MutableList<Special> = mutableListOf()
    val classAbilities: MutableList<ClassAbility> = mutableListOf()
    val inventory: Inventory = Inventory()
}
