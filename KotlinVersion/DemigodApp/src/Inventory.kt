class Inventory {
    private var data: InventoryData = InventoryData()

    fun addItem(item: Item) {
        js("this.data.items.push(item)")
    }
    fun getItem(ID: String): Item? {
        //TODO: functionality below, removeItem
        return null
    }
    fun getItem(index: Int): Item {
        return this.data.items[index]
    }
    fun removeItem(ID: String): Item? {
        for (item in this.data.items) {
            if (item.id == ID) {
                item.amount--
                val index = this.data.items.indexOf(item)
                js("this.data.items.splice(index, 1)")
                return item
            }
        }
        return null
    }
    fun removeLastItem(): Item {
        return js("this.data.items.pop()") as Item
    }
    fun useItem(ID: String): Boolean {
        val item = removeItem(ID) ?: return false
        //TODO: use item effect
        //item.effect
        return true
    }

    fun getGold(): Int { return this.data.gold }
    fun getSize(): Int { return this.data.items.size }
    fun getItems(): Array<Item> { return this.data.items }
    fun getBagType(): String { return this.data.bagType }
    fun getNotes(): String { return this.data.notes }

    fun setGold(gold: Int) { this.data.gold = gold}
    //fun setSize(size: Int) { this.data.items.size = size}
    fun setItems(items: Array<Item>) { this.data.items = items}
    fun setBagType(bagType: String) { this.data.bagType = bagType}
    fun setNotes(notes: String) { this.data.notes = notes}

    data class InventoryData (
            var gold: Int = 0
    ) {
        var items: Array<Item> = arrayOf()
        var bagType: String = ""
        var notes: String = ""
    }

    fun getData():InventoryData {
        return this.data
    }
    fun setData(data: InventoryData) {
        this.data = data
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