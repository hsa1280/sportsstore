angular.module("customFilters", [])
	.filter("unique", function() {
		return function( data, propertyName ) {
			var tempArr = [];
			var uniqueCategory = [];
			for( var i = 0; i < data.length; i++) {
				if( !tempArr[data[i][propertyName]] ) {
					tempArr[data[i][propertyName]] = true;
					uniqueCategory.push(data[i][propertyName]);
				}
			}

			return uniqueCategory;
		}
	})
	.filter("range", function( $filter ) {
		return function( data, page, size ) {
			if( angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size) ) {
				var start_index = ( page - 1 ) * size;
				if( data.length < start_index ) {
					return [];
				} 
				else {
					return $filter("limitTo")( data.splice( start_index ), size);
				}
			}
			else {
				return data;
			}
		}
	})
	.filter( "pageCount", function() {
		return function( data, size ) {
			if( angular.isArray(data) ) {
				var result = [];
				for( var i = 0; i < Math.ceil(data.length / size); i++ ) {
					result.push(i);
				}
				return result;
			}
			else {
				return data;
			}
		}
	})