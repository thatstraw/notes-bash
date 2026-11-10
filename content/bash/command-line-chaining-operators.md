# Command line chaining operators

Below are some commonly used chaining operators which you can use with different commands:

| **Chaining Operator** | **Description** |
| --- | --- |
| & (Ampersand) | This sends a command, script, or process to the background. In short, it makes a command run in the background. |
| && (Logical AND) | The && operator will only execute the second command if the first command SUCCEEDS! , in other words, if the first command exits with a zero status. |
| `\|\|` (Logical OR) | Execute the second command only if the first command fails with a non-zero exit status. |
| ; (Semi-colon) | The command following this operator will execute even if the command preceding this operator is not successfully executed. |
| `!` (NOT) | Negate the exit status of a pipeline. It still runs the command. |
| `a && b \|\| c` (AND-OR) | Run b if a succeeds; run c if a or b fails. This is not an exact substitute for if/else. |
| `\|` (Pipe) | Send the standard output of one command to the standard input of the next. |
| >,>>, < (Input-OutputRedirection) | Redirects the output of a command or a group of commands to a file or stream. |
| \ (Concatenation) | Used to concatenate large commands over several lines in the shell. |
| `( commands )` (Subshell) | Run a group of commands in a subshell environment. |
| `{ commands; }` (Group) | Run a group of commands in the current shell. Include spaces around the braces and a semicolon or newline before the closing brace. |

💡 [Read more about command line chaining here:](https://linuxopsys.com/topics/bash-chain-operators-in-linux)
