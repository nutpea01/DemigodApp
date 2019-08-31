class Inventory {
    private var items: MutableList<Item> = mutableListOf()
    var gold: Int = 0
    var bagType: String = ""
    var size: Int = 0

    fun addItem(item: Item) {
        this.items.add(item)
        this.size++
    }
    fun getItem(ID: String): Item? {
        //TODO: functionality below, removeItem
        return null
    }
    fun getItem(index: Int): Item {
        return this.items[index]
    }
    fun removeItem(ID: String): Item? {
        for (item in this.items) {
            if (item.id == ID) {
                this.items.remove(item)
                this.size--
                return item
            }
        }
        return null
    }
    fun removeLastItem(): Item {
        this.size--
        return this.items.removeAt(this.items.size - 1)
    }
    fun useItem(ID: String): Boolean {
        for (item in this.items) {
            if (item.id == ID) {
                item.amount--
                if (item.amount == 0) {
                    this.items.remove(item)
                }
                //TODO: use item effect
                //item.effect
                return true
            }
        }
        return false
    }
}

class Item (
    var name: String = "",
    var amount: Int = 1,
    var description: String = "",
    var effect: Ability = Ability()
) {
    var id: String = generateID()
}