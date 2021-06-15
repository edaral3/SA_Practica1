from fabric2 import Connection
def function():
    connect_kwargs = {"key_filename":['key.pem']}
    c = Connection(host='18.118.27.241',user='ubuntu',connect_kwargs=connect_kwargs)
    result = c.run("sudo docker login -u edaral3 -p 123456789")
    result = c.run("sudo docker pull edaral3/frontend:latest")
    result = c.run("sudo docker pull edaral3/backend:latest")
    result = c.run("sudo docker-compose up -d")
function()