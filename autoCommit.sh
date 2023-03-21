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

# Run the Git commands
git status
git add -A
git commit -m "$final_message"
git push origin main
