Array.prototype.remove = function() {
    let what, a = arguments, argLength = a.length, ax;
    while (argLength && this.length) {
        what = a[--argLength];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};