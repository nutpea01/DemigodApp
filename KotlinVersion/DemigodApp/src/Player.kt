class Player {
    val traits = Traits("player", 30, "Human", Class())
    val resources = Resources()
    val baseStats = BaseStats()
    val skills: MutableList<Skill> = initSkills()
    val statChecker = StatChecker(this)
    val weapon: Weapon = Weapon()
    val armor: Armor = Armor()
    val accessory: Accessory = Accessory()
    val spells: MutableList<Spell> = mutableListOf()
    val specials: MutableList<Special> = mutableListOf()
    val classAbilities: MutableList<ClassAbility> = mutableListOf()
    val inventory: Inventory = Inventory()

    private fun initSkills(): MutableList<Skill> {
        val list: MutableList<Skill> = mutableListOf()
        list.add(Skill("Common Sense"))
        list.add(Skill("Spell-Craft"))
        list.add(Skill("Cartography"))
        list.add(Skill("Ancient World"))
        list.add(Skill("Study/Reading"))
        list.add(Skill("Magic Knowledge"))
        list.add(Skill("Herbology"))
        list.add(Skill("Advanced Medicine"))
        list.add(Skill("Detective"))
        list.add(Skill("Awareness"))
        list.add(Skill("Disguise"))
        list.add(Skill("Puzzle"))
        list.add(Skill("Sense Motive"))
        list.add(Skill("Escape Artist"))
        list.add(Skill("Stealth/Sneak"))
        list.add(Skill("Trickery/Stealing"))
        list.add(Skill("Lock Picking"))
        list.add(Skill("Free Running"))
        list.add(Skill("Tracking/Hunting"))
        list.add(Skill("Basic Survival"))
        list.add(Skill("Advanced Riding"))
        list.add(Skill("Cooking"))
        list.add(Skill("Beast Taming"))
        list.add(Skill("Pain Tolerance"))
        list.add(Skill("First Aid"))
        list.add(Skill("Inspiration"))
        list.add(Skill("Seduction"))
        list.add(Skill("Charm"))
        list.add(Skill("Speech"))
        list.add(Skill("Persuasion"))
        list.add(Skill("Intimidate"))
        list.add(Skill("Guile"))
        list.add(Skill("Composure/Calm"))
        list.add(Skill("War Tactics"))
        list.add(Skill("Group Management"))
        list.add(Skill("Hand To Hand Combat"))
        list.add(Skill("Weapons Play"))
        list.add(Skill("Specialty Weapon"))
        list.add(Skill("Swimming"))
        list.add(Skill("Climbing"))
        return list
    }
    fun getSkill(name: String): Skill? {
        for (skill in this.skills) {
            if (skill.name == name) {
                return skill
            }
        }
        return null
    }
}
