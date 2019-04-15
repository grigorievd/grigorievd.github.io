#!/usr/bin/env bash

sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password root'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password root'

echo "---------------------"
echo "Adding DNS..."
sudo echo "search turner.com turner.co.uk" > "/etc/resolvconf/resolv.conf.d/base"
echo "Added 'search turner.com turner.co.uk'"
sudo echo "nameserver 10.133.34.40" >> "/etc/resolvconf/resolv.conf.d/base"
echo "Added 'nameserver 10.133.34.40'"
sudo echo "nameserver 10.133.55.213" >> "/etc/resolvconf/resolv.conf.d/base"
echo "Added 'nameserver 10.133.55.213'"
echo "DNS adding complete. Verify with vagrant ssh ; nano /etc/resolvconf/resolv.conf.d/base"
echo "---------------------"



apt-get update
apt-get install -y apache2 php5 mysql-server libapache2-mod-auth-mysql php5-mysql libxml2 php5-xsl php5-gd
rm -rf /var/www
ln -fs /vagrant /var/www
sudo a2enmod rewrite
sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/default
sudo sed -i '/upload_max_filesize = 2M/c upload_max_filesize = 16M' /etc/php5/apache2/php.ini
service apache2 restart

echo "Installing oh-my-zsh... Hold on."
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
echo "Installing oh-my-zsh... Done."