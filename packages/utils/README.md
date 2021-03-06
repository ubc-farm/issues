## Functions

<dl>
<dt><a href="#arrayToMap">arrayToMap(array, [idKey])</a> ⇒ <code>Map.&lt;string, Object&gt;</code></dt>
<dd><p>Transforms an array of objects into a keyed map, using the specified
key property as the key used in the Map.</p>
</dd>
<dt><a href="#arrayToObjectMap">arrayToObjectMap(array, [idKey])</a> ⇒ <code>Object</code></dt>
<dd><p>Transforms an array of objects into a keyed object, using the specified
key property as the key used in the new object.</p>
</dd>
<dt><a href="#mapToObject">mapToObject(map)</a> ⇒ <code>Object</code></dt>
<dd><p>Transforms a map into an object. Non-string and non-number keys are ignored.</p>
</dd>
<dt><a href="#id">id()</a> ⇒ <code>string</code></dt>
<dd><p>Generate unique IDs. Guaranteed to be unique when compared to other strings
generated by this function. The strings are complex enough that they
shouldn&#39;t be accidentally duplicated by hand.</p>
<p>Math.random should be unqiue because of its seeding algorithm.
Convert it to base 36 (numbers + letters), and grab the first 9 characters
after the decimal.</p>
</dd>
</dl>

<a name="arrayToMap"></a>

## arrayToMap(array, [idKey]) ⇒ <code>Map.&lt;string, Object&gt;</code>
Transforms an array of objects into a keyed map, using the specifiedkey property as the key used in the Map.

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;Object&gt;</code> | 
| [idKey] | <code>string</code> | 

<a name="arrayToObjectMap"></a>

## arrayToObjectMap(array, [idKey]) ⇒ <code>Object</code>
Transforms an array of objects into a keyed object, using the specifiedkey property as the key used in the new object.

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;Object&gt;</code> | 
| [idKey] | <code>string</code> | 

<a name="mapToObject"></a>

## mapToObject(map) ⇒ <code>Object</code>
Transforms a map into an object. Non-string and non-number keys are ignored.

**Kind**: global function  

| Param | Type |
| --- | --- |
| map | <code>Map</code> | 

<a name="id"></a>

## id() ⇒ <code>string</code>
Generate unique IDs. Guaranteed to be unique when compared to other stringsgenerated by this function. The strings are complex enough that theyshouldn't be accidentally duplicated by hand.Math.random should be unqiue because of its seeding algorithm.Convert it to base 36 (numbers + letters), and grab the first 9 charactersafter the decimal.

**Kind**: global function  
**See**: https://gist.github.com/gordonbrander/2230317  
