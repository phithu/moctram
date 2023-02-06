window.Haravan || (window.Haravan = {})
 
Haravan.SearchOperators = {
	OR: "||",
	AND: "&&",
	NOT: "!"
}

Haravan.SearchField = function () {
	function SearchField (name) {
		this.name = name;
		this.values = [];
	}

	SearchField.prototype.addValue = function (value, operator) {
		this.values.push({ value: value, operator: operator });
	}
	SearchField.prototype.deleteValue = function (value, operator) {
		var index = -1;

		for (var i = 0; i < this.values.length; i++) {
			if(this.values[i].value === value && this.values[i].operator === operator)
				index = i;
		}	

		this.values.splice(index, 1);								

	}

	SearchField.prototype.deleteValuedqdt = function (value, operator) {
		var index = -1;

		for (var i = 0; i < this.values.length; i++) {
			if(this.values[i].value === value && this.values[i].operator === operator)
				index = i;
		}

		if(index > -1){
			this.values.splice(index, 1);
			console.log(this);
			alert('ok');
		}

	}

	SearchField.prototype.buildParam = function () {
		var value = "";

		for (var i = 0; i < this.values.length; i++) {
			if (i == 0) {
                if(this.name == 'price'){
				value = "(" + this.values[i].value + ")"
                }else{
                value += this.name+":"+this.values[i].value;
				value = "(" + value + ")"
                }
				
			}
			else{
				
				value += this._buildValue(this.name,this.values[i]);
			}
		}
		
		// if (this.values.length > 1) {
		// 	value = "(" + value + ")"
			
		// }
		console.log(value)
		if(value !== ""){
			if(value.includes('product=0')){
				
				return `!${value}`
			}
			return `${value}`
		}
			
			return null;
	}
	SearchField.prototype._buildValue = function (name,value) {
		console.log(name, value)
        if(name === 'price'){
        switch (value.operator.toUpperCase()){
			case Haravan.SearchOperators.OR:
				return`||(${value.value})`;
			case Haravan.SearchOperators.AND:
				return ` (${value.value})`;
			case Haravan.SearchOperators.NOT:
				return  `-(${value.value})`;
			default:
				return `(${value.value})`;
		}

        }else{
        switch (value.operator.toUpperCase()){
			case Haravan.SearchOperators.OR:
				return`||(${name}:${value.value})`;
			case Haravan.SearchOperators.AND:
				return ` (${name}:${value.value})`;
			case Haravan.SearchOperators.NOT:
				return  `-(${name}:${value.value})`;
			default:
				return `(${name}:${value.value})`;
		}
        }
		
	}

	SearchField.name = "SearchField";
	return SearchField;
}();

Haravan.SearchFilter = function () {
	function SearchFilter (){
		this.fields = {};
	}

	SearchFilter.prototype.addValue = function (group, field, value, operator) {
		var searchField = this.findOrCreateField(group, field);

		return searchField.addValue(value, operator);
	}

	SearchFilter.prototype.findOrCreateField = function (group, field) {
		var searchField = this.fields[group];
		if(!searchField) {
			searchField = new Haravan.SearchField(field);
			this.fields[group] = searchField;
		}

		return searchField;
	}

	SearchFilter.prototype.deleteValue = function (group, field, value, operator) {
		var searchField = this.findOrCreateField(group, field);

		return searchField.deleteValue(value, operator);
	}

	SearchFilter.prototype.deleteValuedqdt = function (group, field, value, operator) {
		var searchField = this.findOrCreateField('Khoảng giá', 'price');

		return searchField.deleteValue(value, '||');
	}


	SearchFilter.prototype.deleteGroup = function (group) {
		delete this.fields[group];
	}

	SearchFilter.prototype.search = function (settings) {
		if(!settings)
			settings = {};

		var url = this.buildSearchUrl(settings);

		if(settings.success)
			this._search(url, settings.success);
	}

	SearchFilter.prototype.buildSearchUrl = function (settings) {
		if (!settings)
			settings = {};

		var url = this._buildSearchUrl();

		if (settings.view)
			url += "&view=" + settings.view;
		if (settings.page)
			url += "&page=" + settings.page;
		if (settings.sortby)
			url += "&sortby=" + settings.sortby;

		return url;
	}

	SearchFilter.prototype._buildSearchUrl = function () {
		var url = "";

		var params = [];
		console.log(this.fields)
		for (group in this.fields) {
			if( !this.fields[group].name) continue
			var param = this.fields[group].buildParam();
			if (param )
				params.push(param);
		}
		
		// if (params.length > 5)
		// 	params = params.slice(0, -5);
		url +=`/search?q=filter=(${params.join('&&')})` ;

		return url;
	}

	SearchFilter.prototype._search = function (url, callback) {
		$.ajax({
			url: url,
			dataType: 'html',
			success: function (html) {
				if(callback)
					callback(html);
			}
		});
	}

	SearchFilter.containsOperator = function (value) {
		if(value.indexOf(Haravan.SearchOperators.OR) > 0)
			return true;

		if(value.indexOf(Haravan.SearchOperators.AND) > 0)
			return true;

		return false;
	}

	SearchFilter.name = "SearchFilter"
	return SearchFilter;
}();