function jsonToPojo(){
	var jsonStr = $('textarea#json').val();
	var stringClass = "class UserObject:NSObject,NSCoding{ \n ";
	 var IS_JSON = true;
       try
       {
         var jsonData = $.parseJSON(jsonStr);
		 
		 for (var key in jsonData) {
			 stringClass = stringClass + "\n" + "let " + key + ":String";
		 }
		 
		 var stringInit ="init("
		 for (var key in jsonData) {
			 stringInit = stringInit + "\n" + key + ":String";
		 }
		 stringInit =stringInit + ")\n{";
		 
		for (var key in jsonData) {
			 stringInit = stringInit + "\n" + "self."+key + "="+key;
		 }
		 stringInit =stringInit + "\n}";
		 
		 var stringDecoder = 'required init(coder decoder: NSCoder) {';
		 for (var key in jsonData) {
			 stringDecoder = stringDecoder + '\n' + 'self.'+key + '= decoder.decodeObject(forKey:"'+key +'") as! String';
		 }
		 stringDecoder  = stringDecoder + 'super.init()}' ;
		 
		 var stringEncode = 'func encode(with coder: NSCoder) {';
		 for (var key in jsonData) {
			 stringEncode = stringEncode + '\n' + 'coder.encode(self.'+key + ', forKey:"'+key +'")';
		 }
		 stringEncode  = stringEncode + '}' ;
		 $('textarea#outputClass').val(stringClass + "\n\n" + stringInit + "\n\n" + stringDecoder + "\n\n" +stringEncode);
		 
       }
       catch(err)
       {
		   $('textarea#outputClass').val("not valid json");
               IS_JSON = false;
       }        
}