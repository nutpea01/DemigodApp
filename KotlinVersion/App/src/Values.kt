package demigod.main

open class Value(private var base: Int = 0) {
    val id: String = generateID()
    val modifiers: MutableList<Modifier> = mutableListOf()

    fun getValue(): Int {
        return this.base + getModTotalValue()
    }
    fun getModTotalValue(): Int {
        var temp = 0
        for (mod in this.modifiers) {
            if (mod.active) temp += mod.value
        }
        return temp
    }

    fun setBase(base: Int) {this.base = base}
    fun addBase(add: Int): Int {
        this.base += add
        return this.base
    }

    fun getModBySource(SourceID: String): Modifier {
        for (mod in this.modifiers) {
            if (mod.source == SourceID) {
                return mod
            }
        }
        return Modifier("")
    }
    fun removeModBySource(SourceID: String): Modifier {
        val mod = this.getModBySource(SourceID)
        this.modifiers.remove(mod)
        return mod
    }
    fun getModByID(ID: String): Modifier {
        for (mod in this.modifiers) {
            if (mod.id == ID) {
                return mod
            }
        }
        return Modifier("")
    }
    fun removeModByID(ID: String): Modifier {
        val mod = this.getModByID(ID)
        this.modifiers.remove(mod)
        return mod
    }
}

class DynamicValue (
    current: Int = 150,
    max: Int = 150
) {
    val current = Value(current)
    val max = Value(max)
    fun getMissing(): Int {
        return this.max.getValue() - this.current.getValue()
    }
}

class Modifier (
    val source: String,
    var value: Int = 0,
    var turns: Int = 9999999
) {
    val id: String = generateID()
    var active = true
}