package demigod.main

class Player {
    val traits = Traits("player", 30, "Human",Class())
    val resources = Resources()
    val baseStats = BaseStats()
    val damageHandler = DamageHandler(this)
    val statChecker = StatChecker(this)
}