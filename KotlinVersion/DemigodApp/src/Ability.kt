class Ability (
    val name: String = "",
    val description: String = ""
) {
    val id: String = generateID()
    val icon: Int = 0
}