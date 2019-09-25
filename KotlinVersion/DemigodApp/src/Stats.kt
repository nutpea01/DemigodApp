class BaseStats (
        private var data: BaseStatsData = BaseStatsData()
) {
    private var combatStats: CombatStats = CombatStats()

    fun updateCombat() {
        setATBase(ValueFunctions.getValue(this.data.str)*2)
        setDFBase(ValueFunctions.getValue(this.data.con)*1)
        setMABase(ValueFunctions.getValue(this.data.int)*2)
        setMDBase(ValueFunctions.getValue(this.data.wil)*1)
    }
    fun setSTR(value: Int) {
        this.data.str.base = value
        updateCombat()
    }
    fun setCON(value: Int) {
        this.data.con.base = value
        updateCombat()
    }
    fun setINT(value: Int) {
        this.data.int.base = value
        updateCombat()
    }
    fun setWIL(value: Int) {
        this.data.wil.base = value
        updateCombat()
    }
    fun setSPD(value: Int) { this.data.spd.base = value }
    fun setACC(value: Int) { this.data.acc.base = value }
    fun setATBase(base: Int) { this.combatStats.at.base = base }
    fun setDFBase(base: Int) { this.combatStats.df.base = base }
    fun setMABase(base: Int) { this.combatStats.ma.base = base }
    fun setMDBase(base: Int) { this.combatStats.md.base = base }

    fun getSTR(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.str, includeMods) }
    fun getCON(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.con, includeMods) }
    fun getINT(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.int, includeMods) }
    fun getWIL(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.wil, includeMods) }
    fun getSPD(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.spd, includeMods) }
    fun getACC(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.data.acc, includeMods) }
    fun  getAT(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.combatStats.at, includeMods) }
    fun  getDF(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.combatStats.df, includeMods) }
    fun  getMA(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.combatStats.ma, includeMods) }
    fun  getMD(includeMods: Boolean = true): Int { return ValueFunctions.getValue(this.combatStats.md, includeMods) }

    fun getSTRModifiers(): Array<Modifier> { return this.data.str.modifiers }
    fun getCONModifiers(): Array<Modifier> { return this.data.con.modifiers }
    fun getINTModifiers(): Array<Modifier> { return this.data.int.modifiers }
    fun getWILModifiers(): Array<Modifier> { return this.data.wil.modifiers }
    fun getSPDModifiers(): Array<Modifier> { return this.data.spd.modifiers }
    fun getACCModifiers(): Array<Modifier> { return this.data.acc.modifiers }
    fun  getATModifiers(): Array<Modifier> { return this.combatStats.at.modifiers }
    fun  getDFModifiers(): Array<Modifier> { return this.combatStats.df.modifiers }
    fun  getMAModifiers(): Array<Modifier> { return this.combatStats.ma.modifiers }
    fun  getMDModifiers(): Array<Modifier> { return this.combatStats.md.modifiers }

    data class BaseStatsData (
            val str: Value = Value(0),
            val con: Value = Value(0),
            val int: Value = Value(0),
            val wil: Value = Value(0),
            val spd: Value = Value(0),
            val acc: Value = Value(0)
    )
    fun getData(): BaseStatsData {
        return this.data
    }
    fun setData(data: BaseStatsData) {
        this.data = data
    }

    data class CombatStats (
            val at: Value = Value(0),
            val df: Value = Value(0),
            val ma: Value = Value(0),
            val md: Value = Value(0)
    )
    fun getCombatStats(): CombatStats {
        return this.combatStats
    }
    fun setCombatStats(combatStats: CombatStats) {
        this.combatStats = combatStats
    }
}


class Resources {
    private var data = ResourcesData()

    fun setMaxHP(value: Int) { this.data.hp.max.base = value }
    fun setMaxMP(value: Int) { this.data.mp.max.base = value }
    fun setMaxSP(value: Int) { this.data.sp.max.base = value }
    fun setCurrentHP(value: Int) {
        this.data.hp.current.base = value
        /* TODO: useful for future calculations, but not right now
        if (this.hp.current.getValue() > this.hp.max.getValue()) {
            this.hp.current.setBase(this.hp.max.getValue())
        }
        */
    }
    fun setCurrentMP(value: Int) {
        this.data.mp.current.base = value
        /* TODO: useful for future calculations, but not right now
        if (this.mp.current.getValue() > this.mp.max.getValue()) {
            this.mp.current.setBase(this.mp.max.getValue())
        }
        */
    }
    fun setCurrentSP(value: Int) {
        this.data.sp.current.base = value
        /* TODO: useful for future calculations, but not right now
        if (this.sp.current.getValue() > this.sp.max.getValue()) {
            this.sp.current.setBase(this.sp.max.getValue())
        }
        */
    }

    fun getMaxHP(): Int { return ValueFunctions.getValue(this.data.hp.max) }
    fun getMaxMP(): Int { return ValueFunctions.getValue(this.data.mp.max) }
    fun getMaxSP(): Int { return ValueFunctions.getValue(this.data.sp.max) }
    fun getCurrentHP(): Int { return ValueFunctions.getValue(this.data.hp.current) }
    fun getCurrentMP(): Int { return ValueFunctions.getValue(this.data.mp.current) }
    fun getCurrentSP(): Int { return ValueFunctions.getValue(this.data.sp.current) }

    fun getMaxHPModifiers(): Array<Modifier> { return this.data.hp.max.modifiers }
    fun getMaxMPModifiers(): Array<Modifier> { return this.data.mp.max.modifiers }
    fun getMaxSPModifiers(): Array<Modifier> { return this.data.sp.max.modifiers }
    fun getCurrentHPModifiers(): Array<Modifier> { return this.data.hp.current.modifiers }
    fun getCurrentMPModifiers(): Array<Modifier> { return this.data.mp.current.modifiers }
    fun getCurrentSPModifiers(): Array<Modifier> { return this.data.sp.current.modifiers }

    //TODO: most of these will become more interesting as we add abilities. eventually, they should likely be able to find damage themselves based on stats...?
    fun dealDamage(damage: Int, target: Player) {
        target.resources.setCurrentHP(damage + DiceRoller.roll())
    }
    fun takeDamage(damage: Int, defense: Int = 0) {
        this.setCurrentHP(this.getCurrentHP() - ((damage + DiceRoller.roll()) - defense))
    }
    fun calculateDamage(damage: Int, defense: Int): Int {
        return (damage + DiceRoller.roll()) - defense
    }
    fun healHP(heal: Int) { this.setCurrentHP(this.getCurrentHP()+heal) }

    //NOTE: so all the above formulas assume they'll be given the damage stat as is.
    //this means, something like AT+SPD will be calc BEFORE passing to this class.
    //versatile, to be sure. Problem is, it forces the burden on other classes. Find
    //a work around if able. It should be done in here somehow...

    //FUTURE IDEA: We might be able to set up a lookup table in calculateDamage. Handles
    //every possible action, including a single "custom" action for GM intervention. It
    //would be how calculateDamage() would know what to do. For instance, pass the keyword
    //"fire", and the formula would grab player's MA, target's MD, deal damage and return.

    fun spendMP(cost: Int) { this.setCurrentMP(this.getCurrentMP()-cost) }
    fun spendSP(cost: Int) { this.setCurrentSP(this.getCurrentSP()-cost) }

    fun restoreMP(restore: Int) { this.setCurrentMP(this.getCurrentMP()+restore) }
    fun restoreSP(restore: Int) { this.setCurrentSP(this.getCurrentSP()+restore) }

    data class ResourcesData (
            val hp: DynamicValue = DynamicValue(),
            val sp: DynamicValue = DynamicValue(),
            val mp: DynamicValue = DynamicValue()
    )
    fun getData(): ResourcesData {
        return this.data
    }
    fun setData(data: ResourcesData) {
        this.data = data
    }
}

class Skills {
    private var skillList: Array<SkillData> = initSkills()

    data class SkillData (
            val name: String,
            var check: Boolean = false,  // used for if the player succeeds roll
            val value: Value = Value(0)
    )
    private fun initSkills(): Array<SkillData> {
        val list: Array<SkillData> = arrayOf()
        js("list.push(SkillData(\"Common Sense\"))")
        js("list.push(SkillData(\"Spell-Craft\"))")
        js("list.push(SkillData(\"Cartography\"))")
        js("list.push(SkillData(\"Ancient World\"))")
        js("list.push(SkillData(\"Study/Reading\"))")
        js("list.push(SkillData(\"Magic Knowledge\"))")
        js("list.push(SkillData(\"Herbology\"))")
        js("list.push(SkillData(\"Advanced Medicine\"))")
        js("list.push(SkillData(\"Detective\"))")
        js("list.push(SkillData(\"Awareness\"))")
        js("list.push(SkillData(\"Disguise\"))")
        js("list.push(SkillData(\"Puzzle\"))")
        js("list.push(SkillData(\"Sense Motive\"))")
        js("list.push(SkillData(\"Escape Artist\"))")
        js("list.push(SkillData(\"Stealth/Sneak\"))")
        js("list.push(SkillData(\"Trickery/Stealing\"))")
        js("list.push(SkillData(\"Lock Picking\"))")
        js("list.push(SkillData(\"Free Running\"))")
        js("list.push(SkillData(\"Tracking/Hunting\"))")
        js("list.push(SkillData(\"Basic Survival\"))")
        js("list.push(SkillData(\"Advanced Riding\"))")
        js("list.push(SkillData(\"Cooking\"))")
        js("list.push(SkillData(\"Beast Taming\"))")
        js("list.push(SkillData(\"Pain Tolerance\"))")
        js("list.push(SkillData(\"First Aid\"))")
        js("list.push(SkillData(\"Inspiration\"))")
        js("list.push(SkillData(\"Seduction\"))")
        js("list.push(SkillData(\"Charm\"))")
        js("list.push(SkillData(\"Speech\"))")
        js("list.push(SkillData(\"Persuasion\"))")
        js("list.push(SkillData(\"Intimidate\"))")
        js("list.push(SkillData(\"Guile\"))")
        js("list.push(SkillData(\"Composure/Calm\"))")
        js("list.push(SkillData(\"War Tactics\"))")
        js("list.push(SkillData(\"Group Management\"))")
        js("list.push(SkillData(\"Hand To Hand Combat\"))")
        js("list.push(SkillData(\"Weapons Play\"))")
        js("list.push(SkillData(\"Specialty Weapon\"))")
        js("list.push(SkillData(\"Swimming\"))")
        js("list.push(SkillData(\"Climbing\"))")
        return list
    }

    fun getSkill(name: String): SkillData? {
        for (skill in this.skillList) {
            if (skill.name == name) {
                return skill
            }
        }
        return null
    }
    fun getSkillList(): Array<SkillData> {
        return this.skillList
    }
    fun setSkillList(skillList: Array<SkillData>) {
        this.skillList = skillList
    }
}
class Traits {
    private var data: TraitsData = TraitsData()

    fun getName(): String {
        return this.data.name
    }
    fun setName(name: String) {
        this.data.name = name
    }

    fun getAge(): Int {
        return this.data.age
    }
    fun setAge(age: Int) {
        this.data.age = age
    }

    fun getSpecies(): String {
        return this.data.species
    }
    fun setSpecies(species: String) {
        this.data.species = species
    }

    //TODO: Classes get/setter
    fun getClassName(): String {
        return this.data._class.name
    }
    fun setClassName(name: String) {
        this.data._class.name = name
    }

    fun getLevel(): Int {
        return this.data.level
    }
    fun setLevel(level: Int) {
        this.data.level = level

    }

    //TODO: Icon set/getter

    data class TraitsData (
            var name: String = "player",
            var age: Int = 0,
            var species: String = "Human",
            val _class: Class = Class(),
            var level: Int = 1,
            var icon: Int = 0
    )
    fun getData(): TraitsData {
        return this.data
    }
    fun setData(data: TraitsData) {
        this.data = data
    }
}

//TODO: classes
data class Class (
        var name: String = ""
)