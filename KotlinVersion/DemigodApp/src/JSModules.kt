import org.w3c.dom.events.Event

external fun encodeURIComponent(str: String): String
external fun setInterval(callback: ((Event) -> Unit?), milliseconds: Int): Int
external fun clearInterval(intervalID: Int)

@JsModule("Array")
external fun push(unit: Unit): Int
