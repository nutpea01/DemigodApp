package demigod.main

class BaseStats (
    private val str: Value = Value(0),
    private val con: Value = Value(0),
    private val int: Value = Value(0),
    private val wil: Value = Value(0),
    private val spd: Value = Value(0),
    private val acc: Value = Value(0)
) {
    val combatStats: CombatStats = CombatStats()

    fun updateCombat() {
        combatStats.at.setBase(str.getValue()*2)
        combatStats.df.setBase(con.getValue()*1)
        combatStats.ma.setBase(int.getValue()*2)
        combatStats.md.setBase(wil.getValue()*1)
    }
    fun setSTR(str: Int) {
        this.str.setBase(str)
        updateCombat()
    }
    fun setCON(con: Int) {
        this.con.setBase(con)
        updateCombat()
    }
    fun setINT(int: Int) {
        this.int.setBase(int)
        updateCombat()
    }
    fun setWIL(wil: Int) {
        this.wil.setBase(wil)
        updateCombat()
    }
    fun setSPD(spd: Int) {this.spd.setBase(spd)}
    fun setACC(acc: Int) {this.acc.setBase(acc)}
}

data class Resources (
    val hp: DynamicValue = DynamicValue(150,150),
    val sp: DynamicValue = DynamicValue(150,150),
    val mp: DynamicValue = DynamicValue(150,150)
) {
    fun setHP(hp: Int) {
        this.hp.current.setBase(hp)
        this.hp.max.setBase(hp)
    }
    fun setMP(mp: Int) {
        this.mp.current.setBase(mp)
        this.mp.max.setBase(mp)
    }
    fun setSP(sp: Int) {
        this.sp.current.setBase(sp)
        this.sp.max.setBase(sp)
    }
}

data class CombatStats (
    val at: Value = Value(0),
    val df: Value = Value(0),
    val ma: Value = Value(0),
    val md: Value = Value(0)
)

data class Skills (val temp: Int = 0)
data class Traits (val temp: Int = 0)