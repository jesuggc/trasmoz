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

#check if status has the sentence "nothing to commit"
if echo "$status" | grep -q "nothing to commit"
then
    echo -e "\e[41mNO CHANGES TO COMMIT\e[0m" #fondo rojo
else
    git status
    git add -A
    commit_output = $(git commit -m "$final_message" -v)
    nchanges=$(echo "$commit_output" | grep -o "[0-9]\+ file" | awk '{print $1}')
    git push origin main
    echo -e "\e[42;37mALL ($nchanges) CHANGES COMMITED\e[0m" #fondo verde 
fi

echo "The value of nchanges is: $nchanges"
#What does -z do
#nchanges=$(echo "$status" | sed -n 's/^\([0-9]\+\) file changed.*/\1/p')
