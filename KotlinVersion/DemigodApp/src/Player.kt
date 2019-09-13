class Player {
    val traits = Traits()
    val resources = Resources()
    val baseStats = BaseStats()
    val skills = Skills()
    val statChecker = StatChecker(this)
    val weapon: Weapon = Weapon()
    val armor: Armor = Armor()
    val accessory: Accessory = Accessory()
    val abilities: Abilities = Abilities()
    val inventory: Inventory = Inventory()
}
