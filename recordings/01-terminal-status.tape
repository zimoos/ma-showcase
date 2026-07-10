Output "recordings/01-terminal-status.gif"

Require bash

Set Shell "bash"
Set FontSize 24
Set Width 1500
Set Height 900
Set Padding 28
Set Theme "Dracula"
Set WindowBar "Colorful"
Set TypingSpeed 20ms

Type "cd /Users/zhuqingyu/dev/ma-showcase"
Enter
Sleep 1s

Type "AGORA_ROOT=/Users/zhuqingyu/dev/agora bash demos/01-terminal-status/run.sh"
Enter
Sleep 25s

Type "test -s demos/01-terminal-status/artifact/index.html && echo '[verified] artifact exists'"
Enter
Sleep 3s
