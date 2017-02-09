(function(){

  var Person = function(first, last) {
    this.first = first;
    this.last = last;
    this.toString = function() {
      return "[Person] " + this.first + " " + this.last;
    }
  };

  Person.prototype.sing= function(stanza) {
    document.write("Person.sing()>> " + stanza +"<br/>");
  };

  var p1 = new Person("Jorge", "Vocoder");
  document.write(p1.toString()+"<br/>");
  p1.sing("Lalala...");

  // ======================================

  var Vocalist = function(first, last, country, style) {
    Person.call(this, first, last);
    this.country = country;
    this.style = style;
    this.toString = function(){
      return "[Vocalist] "
        + this.style + " from " + this.country
        + " " + this.first + " " + this.last;
    }
  };

  // extend Person class
  Vocalist.prototype = Object.create(Person.prototype);
  Vocalist.prototype.constructor = Vocalist;


  Vocalist.prototype.sing = function(stanza){
    document.write("Vocalist.sing()>> "
      + this.style
      + " from "
      + this.country + " by "
      + this.first
      + " "
      + this.last
      + " "
      + stanza + "<br/>");
  };

  var v1 = new Vocalist("Placido", "Domingo", "Italy", "Classical");
  document.write(v1.toString()+"<br/>");
  v1.sing("mimimimi...");

})();