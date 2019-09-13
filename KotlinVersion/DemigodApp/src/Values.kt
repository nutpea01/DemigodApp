import kotlin.math.min

data class Value(
        var base: Int = 0
) {
    val id: String = generateID()
    val modifiers: MutableList<Modifier> = mutableListOf()
}

data class DynamicValue (
    val current: Value = Value(150),
    val max: Value = Value(150)
)

data class Modifier (
    val source: String,
    var value: Int = 0,
    var turns: Int = 9999999
) {
    val id: String = generateID()
    var active = true
}

object ValueFunctions {
    fun getValue(value: Value, includeMods: Boolean = true): Int {
        if (includeMods) return min(value.base + getModTotalValue(value), 9999)
        return min(value.base, 9999)
    }
    fun getDifference(value1: Value, value2: Value): Int {
        return getValue(value1) - getValue(value2)
    }

    fun getModTotalValue(value: Value): Int {
        var temp = 0
        repeat(value.modifiers.size) {
            if (value.modifiers[it].active) temp += value.modifiers[it].value
        }
        /*
        for (mod in value.modifiers) {
            if (mod.active) temp += mod.value
        }

         */
        return temp
    }

    fun getModBySource(value: Value, SourceID: String): Modifier {
        for (mod in value.modifiers) {
            if (mod.source == SourceID) {
                return mod
            }
        }
        return Modifier("")
    }
    fun removeModBySource(value: Value, SourceID: String): Modifier {
        val mod = getModBySource(value, SourceID)
        value.modifiers.remove(mod)
        return mod
    }
    fun getModByID(value: Value, ID: String): Modifier {
        for (mod in value.modifiers) {
            if (mod.id == ID) {
                return mod
            }
        }
        return Modifier("")
    }
    fun removeModByID(value: Value, ID: String): Modifier {
        val mod = getModByID(value, ID)
        value.modifiers.remove(mod)
        return mod
    }
}