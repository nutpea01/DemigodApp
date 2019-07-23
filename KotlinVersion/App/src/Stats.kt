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
        combatStats.setATBase(str.getValue()*2)
        combatStats.setDFBase(con.getValue()*1)
        combatStats.setMABase(int.getValue()*2)
        combatStats.setMDBase(wil.getValue()*1)
    }
    fun setSTR(value: Int) {
        this.str.setBase(value)
        updateCombat()
    }
    fun setCON(value: Int) {
        this.con.setBase(value)
        updateCombat()
    }
    fun setINT(value: Int) {
        this.int.setBase(value)
        updateCombat()
    }
    fun setWIL(value: Int) {
        this.wil.setBase(value)
        updateCombat()
    }
    fun setSPD(value: Int) {this.spd.setBase(value)}
    fun setACC(value: Int) {this.acc.setBase(value)}

    fun getSTR(): Int {return this.str.getValue()}
    fun getCON(): Int {return this.con.getValue()}
    fun getINT(): Int {return this.int.getValue()}
    fun getWIL(): Int {return this.wil.getValue()}
    fun getSPD(): Int {return this.spd.getValue()}
    fun getACC(): Int {return this.acc.getValue()}
}

data class Resources (
    private val hp: DynamicValue = DynamicValue(150,150),
    private val sp: DynamicValue = DynamicValue(150,150),
    private val mp: DynamicValue = DynamicValue(150,150)
) {
    fun setMaxHP(value: Int) { this.hp.max.setBase(value) }
    fun setMaxMP(value: Int) { this.mp.max.setBase(value) }
    fun setMaxSP(value: Int) { this.sp.max.setBase(value) }

    fun setCurrentHP(value: Int) {
        this.hp.current.setBase(value)
        if (this.hp.current.getValue() > this.hp.max.getValue()) {
            this.hp.current.setBase(this.hp.max.getValue())
        }
    }
    fun setCurrentMP(value: Int) {
        this.mp.current.setBase(value)
        if (this.mp.current.getValue() > this.mp.max.getValue()) {
            this.mp.current.setBase(this.mp.max.getValue())
        }
    }
    fun setCurrentSP(value: Int) {
        this.sp.current.setBase(value)
        if (this.sp.current.getValue() > this.sp.max.getValue()) {
            this.sp.current.setBase(this.sp.max.getValue())
        }
    }

    fun getMaxHP(): Int { return this.hp.max.getValue() }
    fun getMaxMP(): Int { return this.mp.max.getValue() }
    fun getMaxSP(): Int { return this.sp.max.getValue() }

    fun getCurrentHP(): Int { return this.hp.current.getValue() }
    fun getCurrentMP(): Int { return this.mp.current.getValue() }
    fun getCurrentSP(): Int { return this.sp.current.getValue() }
}

data class CombatStats (
    private val at: Value = Value(0),
    private val df: Value = Value(0),
    private val ma: Value = Value(0),
    private val md: Value = Value(0)
) {
    fun getAT(): Int {return this.at.getValue()}
    fun getDF(): Int {return this.df.getValue()}
    fun getMA(): Int {return this.ma.getValue()}
    fun getMD(): Int {return this.md.getValue()}

    fun setATBase(base: Int) {this.at.setBase(base)}
    fun setDFBase(base: Int) {this.df.setBase(base)}
    fun setMABase(base: Int) {this.ma.setBase(base)}
    fun setMDBase(base: Int) {this.md.setBase(base)}
}

//TODO: Skills
data class Skills (val temp: Int = 0)
data class Traits (
    var name: String,
    var age: Int,
    var species: String,
    val _class: Class,
    var level: Int = 1
)

//TODO: class
class Class {val TEMP = 0}