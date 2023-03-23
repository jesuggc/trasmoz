#!/bin/bash
clear
git fetch
git reset --hard origin/main

branch= $(git branch --show-current)
"\n\e[42;37mLOCAL CHANGES DISCARDED. REMOTE REPOSITORY $branch DOWNLOADED\e[0m"