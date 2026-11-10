# Getting started

# Getting Started

### Variables

```bash
NAME="TRAW"

echo ${NAME}    # => TRAW :This prints the variable value
echo $NAME      # => TRAW :This prints the variable value
echo "$NAME"    # => TRAW :This prints the variable value
echo '$NAME'    # => $NAME : This will print the Exact string not value.
echo "${NAME}!" # => TRAW! :Concatenation of variable value with !

# Note: When declaring variables there should be no spaces between the variable
# name and equal sign and between the equal sign and the variable value.
# this will throw and error
NAME = "TRAW"   # => Error (about space)

```

💡 It is crucial to keep in mind that when referencing a variable value, the dollar sign is used, but when referencing the variable to assign a value, the dollar sign is not used.

### **Special parameters**

| Parameter | Description |
| --- | --- |
| `$1`… `$9` | Parameters 1 to 9. |
| `$0` | Stores the name of the script file or the current shell name. |
| `$1` | represents the first argument. |
| `${10}` | Positional parameter 10. |
| `$#` | Number of positional parameters |
| `$*` | stores all the arguments. |
| `$$` | Process id of the current shell. |
| `$@` | All arguments, starting from first. |
| `$-` | Current options. |
| `$_` | Last argument of the previous command |
| `$!` | The process ID (PID) of the most recently executed background pipeline (like started with `command &`) |
| `$?` | Status of the most recently executed foreground-pipeline (exit/return code) |

🔗 [Learn more about special parameters here:](https://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables)

### Comments

```bash
# This is an inline Bash comment.
: '
This is a
Multi-line comment
in bash

If it looks very neat
'

# **Note you can replace the single quoations with**
# **double qoutations**
```

💡 For Multi-line comments use `:'` to open and `'`
 to close.

### Functions

```bash
#!/usr/bin/env bash

get_username() {
    echo "TRAW"
}

# Or using the function keyword
function get_username() {
    echo "TRAW"
}

echo "You are $(get_username)"
```

### Brace Expansion

| Example  | Description |
| --- | --- |
| `$ echo {A,B}.txt` | output will be A.txt and B.txt |
| `{A,B}` | Same as A B |
| `{1..5}` | Same as 1 2 3 4 5 |

🔗 [Learn more about brace expansion here:](https://wiki.bash-hackers.org/syntax/expansion/brace)

### Example script

```bash
#!/usr/bin/env bash

greet="world World"
echo "$greet!, I'm new here."
# => Hello world! I'm new here.

#Execute the script

$ chmod +x helloworld.sh
$ ./helloworld.sh

# or just

$ bash helloworld.sh
```

### Conditions

```bash
#!/usr/bin/env bash

string="test"

if [[ -z "$string" ]]; then
    echo "String is empty"
elif [[ -n "$string" ]]; then
    echo "String is not empty"
fi
```

### Command Substitution

```bash
# => I'm TRAW
echo "I'm $(whoami)"

# Similar to:
echo "I'm `whoami`"
```

🔗 [Learn more about command substitution here:](https://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

---
