# Bash Arrays

# **Bash Arrays**

## Array Declaration syntax

| Syntax | Description |
| --- | --- |
| `ARRAY=()` | Declares an **indexed** array `ARRAY` and initializes it to be empty. This can also be used to empty an existing array. |
| `ARRAY[0]=` | Generally sets the first element of an **indexed** array. If no array `ARRAY` existed before, it is created. |
| `declare -a ARRAY` | Declares an **indexed** array `ARRAY`. An existing array is not initialized. |
| `declare -A ARRAY` | Declares an **associative** array `ARRAY`. This is the one and only way to create associative arrays in bash. |

## Indexes and Metadata

| `${ARRAY[0]}` | get the first element (refer to **Getting values** table) |
| --- | --- |
| `${ARRAY[-1]}` | get the last element (refer to **Getting value**s table) |
| `${ARRAY[*]}` | get all the elements (refer to **Getting values** table) |
| `${ARRAY[@]}` | get all the elements as well(refer to **Getting values** table) |
| `${#ARRAY[@]}` `${#ARRAY[*]}` | Expands to the **number of elements** in `ARRAY` |
| `${#ARRAY}` | Expand to the length of the first element. |
| `${#ARRAY[N]}` | Expands to the **length** of an individual array member at index `N`. If the Nth element is a string it gets the (**stringlength**) |
| `${#ARRAY[STRING]}` | Expands to the length of an individual associative array member at index STRING (**stringlength**) |
| `${#ARRAY[@]:N:M}` `${#ARRAY[*]:N:M}` | Expands to the number of elements  to `M` starting from `N` . The `M` can be omitted and the it will expand from `N` up to the last element.  |
| `${!ARRAY[@]}` `${!ARRAY[*]}` | Expands to the **indexes** in `ARRAY` since BASH 3.0 |

## **Destroying Arrays**

The [unset](https://wiki.bash-hackers.org/commands/builtin/unset) builtin command is used to destroy (unset) arrays or individual elements of arrays.

| Syntax | Description |
| --- | --- |
| `unset -v ARRAY` `unset -v ARRAY[@] unset -v ARRAY[*]` | Destroys a complete array |
| `unset -v 'ARRAY[N]'` | Destroys the array element at index `N` . [Always quote the array name and index.](https://wiki.bash-hackers.org/syntax/arrays#destruction) |
| `ARRAY=( ${ARRAY[@]/STR*/} )` `ARRAY=( ${ARRAY[*]/STR*/} )` | Remove values by regular expressions (`STR` short for string) |
| `unset -v ARRAY[STRING]` | Destroys the array element of the associative array at index  `STRING` |

## Storing Values

| Syntax | Description |
| --- | --- |
| `ARRAY[N]=VALUE` | Sets the element `N` of the **indexed** array `ARRAY` to `VALUE`. **`N` can be any valid [arithmetic expression](https://wiki.bash-hackers.org/syntax/arith_expr)**. |
| `ARRAY[STRING]=VALUE` | Sets the element indexed by `STRING` of the **associative array** `ARRAY`. |
| `ARRAY=VALUE` | As above. If no index is given, as a default the zeroth element is set to `VALUE`. Careful, this is even true of associative arrays - there is no error if no key is specified, and the value is assigned to string index "0". |
| `ARRAY=(E1 E2 …)` | Compound array assignment - sets the whole array `ARRAY` to the given list of elements indexed sequentially starting at zero. The array is unset before assignment unless the += operator is used. When the list is empty (`ARRAY=()`), the array will be set to an empty array. This method obviously does not use explicit indexes. An **associative array** can **not** be set like that! Clearing an associative array using `ARRAY=()` works. |
| `ARRAY=([X]=E1 [Y]=E2 …)` | Compound assignment for indexed arrays with index-value pairs declared individually (here for example `X` and `Y`). X and Y are arithmetic expressions. This syntax can be combined with the above - elements declared without an explicitly specified index are assigned sequentially starting at either the last element with an explicit index, or zero. |
| `ARRAY=([S1]=E1 [S2]=E2 …)` | Individual mass-setting for **associative arrays**. The named indexes (here: `S1` and `S2`) are strings. |
| `ARRAY+=(E1 E2 …)` `ARRAY=("${ARRAY[@]}" E1 ...)` | Append to ARRAY. |
| `ARRAY=("${ANOTHER_ARRAY[@]}")` | Copy ANOTHER_ARRAY to ARRAY, copying each element. You can omit the quotations: `ARRAY=(${ANOTHER_ARRAY[@]})` |
| `ARRAY=("$ARRAY[@]}" "${ANOTHER_ARRAY[@]}")` | Concatenating Arrays. Quotations can be omitted : `ARRAY=($ARRAY[@]} ${ANOTHER_ARRAY[@]})` and you can also replace `@` with `*` |
| `ARRAY=($(cat file))` | storing array values from reading a file. |
| `ARRAY=({N..M})`  | Getting array values from brace expansion `N` and `M` can be strings or numeric values (see **Array Discussion**) |

## **Getting values**

| Syntax | Description |
| --- | --- |
| `${ARRAY[N]}` | Expands to the value of the index `N` in the **indexed** array `ARRAY`. If `N` is a negative number, it's treated as the offset from the maximum assigned index (can't be used for assignment) - 1 |
| `${ARRAY[S]}` | Expands to the value of the index `S` in the **associative** array `ARRAY`. |
| `"${ARRAY[@]}" ${ARRAY[@]} "${ARRAY[*]}" ${ARRAY[*]}` | Similar to [mass-expanding positional parameters](https://wiki.bash-hackers.org/scripting/posparams#mass_usage), this expands to all elements. If unquoted, both subscripts `*` and `@` expand to the same result, if quoted, `@` expands to all elements individually quoted, `*` expands to all elements quoted as a whole (**tested all these scenarios, but they don’t seem to produce intended results on my version of bash**).  |
| `"${ARRAY[@]:N:M}" ${ARRAY[@]:N:M} "${ARRAY[*]:N:M}" ${ARRAY[*]:N:M}` | Similar to what this syntax does for the characters of a single string when doing [substring expansion](https://wiki.bash-hackers.org/syntax/pe#substring_expansion), this expands to `M` elements starting with element `N`. This way you can mass-expand individual indexes. The rules for quoting and the subscripts `*` and `@` are the same as above for the other mass-expansions. |

🔗 For clarification: When you use the subscripts `@` or `*` for mass-expanding, then the behavior is exactly what it is for `$@` and `$*`
when [mass-expanding the positional parameters](https://wiki.bash-hackers.org/scripting/posparams#mass_usage). You should read this article to understand what's going on.

💡 It is best to [explicitly specify -v](https://wiki.bash-hackers.org/commands/builtin/unset#portability_considerations) when unsetting variables with unset.

💡 [Learn more about bash Arrays here](https://wiki.bash-hackers.org/syntax/arrays)

## Array Discussion

### **Compound indexed array assignment**

```bash
#
:'
Compound array assignment - sets the whole array
NAMES to the given list of elements.
'
# NAMES => Creg Jan Anna
NAMES=('Creg' 'Jan' 'Anna')

# using the declare construct
declare -a Numbers=(1 2 3)
```

### **Indexed array assignment  using brace expansion**

```bash

ARRAY1=(foo{1..2}) # => foo1 foo2

ARRAY2=({A..D})    # => A B C D

ARRAY3=({1..5})    # => 1 2 3 4 5

ARRAY4=({A..B}{1..2}) #=> A1 A2 B1 B2
```

### **Index array assignment**

```bash
:'
Sets the element N of the indexed array NAMES to
VALUE.
N can be any valid arithmetic expression.
'

NAMES[0]='Creg'
NAMES[1]='Jan'
NAMES[2]='Anna'
# NAMES => Creg Jan Anna
```

### **Appending values to arrays**

```bash
NAMES=('Creg' 'Jan' 'Anna')

NAMES+=('Jay' 'Jimmy' 'Tom')
# NAMES => Creg Jan Anna Jay Jimmy Tom

# This is also the same as
NAMES=(${NAMES[@]} 'Jay' 'Jimmy' 'Tom')
# NAMES => Creg Jan Anna Jay Jimmy Tom

```

### **Compound associative array assignment**

```bash
:'
Individual mass-setting for **associative arrays**.
The named indexes (here: name, age....) are strings.
'

declare -A person # this line is required
# quotes can me omitted for the keys, see the **age** key below
person=(["name"]="Jay" [age]=22 ["eye_color"]="blue")

# person => Jay 22 blue
```

### **Merging/Concatenating Arrays**

```bash
ARRAY1=(foo{1..2}) # => foo1 foo2
ARRAY2=({A..D})    # => A B C D
ARRAY3=({1..5})    # => 1 2 3 4 5

# Merge Arrays => foo1 foo2 A B C D 1 2 3 4 5
ARRAY4=(${ARRAY1[@]} ${ARRAY2[@]} ${ARRAY3[@]})

The **@** can also be replace with a *****

```

### **Key associative array assignment**

```bash
declare -A person

person[name]="Jay"

person[age]=22

person[eye_color]="blue"

# person => Jay 22 blue
```

### **Iterating an indexed array**

```bash
names=('Jay' 'Joe' 'Jimmy')
for name in "${names[@]}"; do
    echo $name
done

# using index
for i in "${!names[@]}"; do
  printf "%s\t%s\n" "$i" "${names[$i]}"
done
```

### **Working with associative arrays**

```bash
declare -A person
person=(["name"]="Jay" [age]=22 ["eye_color"]="blue")

echo ${person[name]} #  Get person's name
echo ${sounds[@]}   # Get all person's values
echo ${sounds[*]}  # Get all person's values
echo ${!person[@]}  # All person's  keys (age, name...)
echo ${#person[@]}  # Number of elements

unset -v person[age]   # Delete person's age

# All of the above operations workes with index arrays, just that you only
# replace the keys with indexes
```

### **Iterating an associative array**

```bash
declare -A person
person=(["name"]="Jay" [age]=22 ["eye_color"]="blue")

for value in "${person[@]}"; do
    echo $value
done

# Using keys
for key in "${!person[@]}"; do
    echo "$key  ${person[$key]}"
done

```

### **Array arguments**

```bash
function extract()
{
    # creating a local array from function argument 1 ($1)
    local -n local_names=$1
	  # creating a local index from function argument 2 ($2)
    local index=$2
    echo "${local_names[$index]}"
 }
# defining global array names
names=('Jay' 'Joe' 'Jimmy')

extract names 2     # => Jimmy
```

---
