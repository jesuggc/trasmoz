#!/bin/bash

# Get the number argument passed to the script
commit_message="$1"
author_name=$(git config user.name)
status=$(git status)

# Check if the number argument is empty
if [ -z "$commit_message" ]
then
    final_message="Autocommit without comment by $author_name"  
else
    final_message="Autocommit by $author_name: $commit_message"
fi


if [ -z "$status" ]
then
    echo -e "\e[41mNO CHANGES TO COMMIT\e[0m" #fondo rojo
else
    git status
    git add -A
    git commit -m "$final_message"
    git push origin main
    echo -e "\e[42;37mALL CHANGES COMMITED\e[0m" #fondo verde
fi
#What does -z do
#I want to add a check to see if there are any changes to commit before running the git commands. I tried to use the status variable but it doesn't work. I tried to use the following code but it doesn't work either:
