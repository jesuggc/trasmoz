#!/bin/bash

commit_message="$1"
author_name=$(git config user.name)
status=$(git status)

if [ -z "$commit_message" ]
then
    final_message="Autocommit without comment by $author_name"  
else
    final_message="Autocommit by $author_name: $commit_message"
fi

if echo "$status" | grep -q "nothing to commit"
then
    echo -e "\e[41mNO CHANGES TO COMMIT\e[0m" #fondo rojo
else
    git status
    git add -A
    commit_output=$(git commit -m "$final_message" -v)
    nchanges=$(echo "$commit_output" | grep -o "[0-9]\+ file" | awk '{print $1}')
    git push origin main
    echo -e "\n\e[42;37mALL ($nchanges) CHANGES COMMITED\e[0m" #fondo verde 
fi


