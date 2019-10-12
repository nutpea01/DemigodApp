class Inventory {
    private var data: InventoryData = InventoryData()

    fun addItem(item: Item) {
        this.data.items.add(item)
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
                this.data.items.remove(item)
                return item
            }
        }
        return null
    }
    fun removeLastItem(): Item {
        return this.data.items.removeAt(this.data.items.size - 1)
    }
    fun useItem(ID: String): Boolean {
        for (item in this.data.items) {
            if (item.id == ID) {
                item.amount--
                if (item.amount == 0) {
                    this.data.items.remove(item)
                }
                //TODO: use item effect
                //item.effect
                return true
            }
        }
        return false
    }

    fun getGold(): Int { return this.data.gold }
    fun getSize(): Int { return this.data.items.size }
    fun getItems(): MutableList<Item> { return this.data.items }
    fun getBagType(): String { return this.data.bagType }
    fun getNotes(): String { return this.data.notes }

    fun setGold(gold: Int) { this.data.gold = gold}
    //fun setSize(size: Int) { this.data.items.size = size}
    fun setItems(list: Array<Item>) {
        this.data.items.clear()
        for (item in list) {
            insertItemSlot(this, item)
        }
    }
    fun setBagType(bagType: String) { this.data.bagType = bagType}
    fun setNotes(notes: String) { this.data.notes = notes}

    data class InventoryData (
            var gold: Int = 0
    ) {
        val items: MutableList<Item> = mutableListOf()
        var bagType: String = ""
        var notes: String = ""
    }

    fun getData():InventoryData {
        return this.data
    }
    fun setData(gold: Int, items: Array<Item>, bagType: String, notes: String) {
        setGold(gold)
        setItems(items)
        setBagType(bagType)
        setNotes(notes)
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