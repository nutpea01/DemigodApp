import org.w3c.dom.HTMLHyperlinkElementUtils
import org.w3c.dom.HTMLIFrameElement
import org.w3c.dom.HTMLInputElement
import kotlin.browser.document

object FileHandler {
    var filename: String = ""
    init { }

    fun setFilename(filename: String) { this.filename = filename }

    fun save(filename: String, player: Player) {
        val file = "$filename.demigod"

        //val name    = (document.getElementById("Name")    as HTMLInputElement).value
        //val age     = (document.getElementById("Age")     as HTMLInputElement).value
        //val species = (document.getElementById("Species") as HTMLInputElement).value
        //val _class  = (document.getElementById("Class")   as HTMLInputElement).value
        //val level   = (document.getElementById("Level")   as HTMLInputElement).value
        //s.writeline(document.passForm.input3.value);

        var text = "["
        text += JSON.stringify(player.traits) + ","
        text += JSON.stringify(player.resources) + ","
        text += JSON.stringify(player.baseStats) + ","
        text += JSON.stringify(player.weapon) + ","
        text += JSON.stringify(player.armor) + ","
        text += JSON.stringify(player.accessory) + ","
        text += JSON.stringify(player.skills) + ","
        text += JSON.stringify(player.spells) + ","
        text += JSON.stringify(player.specials) + ","
        text += JSON.stringify(player.classAbilities) + ","
        text += JSON.stringify(player.inventory)
        text += "]"

        // create hyperlink and set it's href and text "defined above"
        js("""
            var save = document.createElement('a');
            save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        """)
        // set save as a download and prevent display
        js("""
            save.setAttribute('download', file);
            save.style.display = 'none';
        """)
        // add save, click it, and remove it
        js("""
            document.body.appendChild(save);
            save.click();
            document.body.removeChild(save);
        """)
    }

    fun load() {
        val iframe = document.createElement("iframe") as HTMLIFrameElement
        iframe.id = "iframe"
        iframe.style.display = "none"
        document.body?.appendChild(iframe)
        iframe.src = filename
        val text = (document.getElementById("iframe") as HTMLIFrameElement).contentDocument?.body?.firstChild?.nodeValue
        println(text)
        // TODO: the goal here is to take in a file, read it's string literally (its valid JSON) and parse it like below.
        //var text: String
        js("""
            var load = JSON.parse(text)
/////////   alert(load[0].name)    ////////////////////////////////////////////////////////////////////////////////////
        """)
    }

}