PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
#docker-compose exec webmet bash '/app/website/actualizar.sh'
#mkdir ~/webmet/new_radars_pngs
#mv ~/new_radars_pngs/* ~/webmet/new_radars_pngs/
cd ~/webmet
docker-compose exec webmet bash '/app/website/actualizar.sh'
mkdir ~/webmet/new_radars_pngs
