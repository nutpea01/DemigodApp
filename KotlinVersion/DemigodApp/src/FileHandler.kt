package demigod.main


object FileHandler {
    init { }

    fun saveJSON(file: String, player: Player) {
        val filename = "$file.json"

        val text = """
            tester
        """.trimIndent()

        // create hyperlink and set it's href and text "defined above"
        js("""
            var save = document.createElement('a');
            save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        """)
        // set save as a download and prevent display
        js("""
            save.setAttribute('download', filename);
            save.style.display = 'none';
        """)
        // add save, click it, and remove it
        js("""
            document.body.appendChild(save);
            save.click();
            document.body.removeChild(save);
        """)

        //s.writeline(document.passForm.input3.value);
    }


}