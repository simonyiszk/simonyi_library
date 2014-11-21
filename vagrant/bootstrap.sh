#!/usr/bin/env bash

# Requirements
sudo apt-get update
sudo apt-get install -y build-essential git make g++ python-dev python-pip

# MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start

# NodeJS
wget http://nodejs.org/dist/v0.10.33/node-v0.10.33.tar.gz
mv node-v0.10.33.tar.gz /opt
cd /opt
tar -xvzf node-v0.10.33.tar.gz
cd node-v0.10.33/
./configure && make && sudo make install

# Node packages
sudo npm install -g express 
npm install -g bower yo

cd /home/vagrant/simonyi-konyvtar/back-end/
npm install

cd /home/vagrant/simonyi-konyvtar/front-end/
npm install
bower install
