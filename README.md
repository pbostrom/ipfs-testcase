Test case to reproduce an IPFS issue

Prereqs:

Install docker, [docker-compose](https://docs.docker.com/compose/install/)

```
git clone https://github.com/pbostrom/ipfs_testcase.git
cd ipfs_testcase
sudo docker-compose up -d
sudo docker run -it --network ipfs_testcase_proxy-tier pbostrom/ipfs_testcase
```

You should see output similar to the following:

```
-----------------
Uploading direct to IPFS API port 5001...
Success
hashes:[{"path":"upload/1.png","hash":"QmP8kjseENhZotpBoCsYAH3kED3bCTQQhCmwkhExkFqUga","size":4624987},{"path":"upload/3.png","hash":"QmNzGKM5z8nv999XTEwEHnyz2WDpvfLz41VBi3pqUx6ETt","size":7889158},{"path":"upload/a","hash":"Qmbvkmk9LFsGneteXk3G7YLqtLVME566ho6ibaQZZVHaC9","size":10},{"path":"upload","hash":"QmUTZMg4DgynXJn2U3AX6jgeMhy2kPFUZSGX8VQDHurzLT","size":12514302}]
-----------------
Uploading via nginx proxy to IPFS API. This should stall and eventually timeout...
Success
hashes:[]
```

If the container process does not stall/timeout, and successfully
uploads the three files, you may need to re-run it again to reproduce
the error. I get it pretty consistently though on both MacOS and
Linux.

Once reproduced, check the nginx logs:
```
$ sudo docker logs nginx
...
2018/11/08 18:54:09 [error] 6#6: *1 upstream timed out (110: Connection timed out) while reading upstream, client: 172.18.0.4, server: , request: "POST /api/v0/add?recursive=true&stream-channels=true HTTP/1.1", upstream: "http://172.18.0.2:5001/api/v0/add?recursive=true&stream-channels=true", host: "nginx"
172.18.0.4 - - [08/Nov/2018:18:54:09 +0000] "POST /api/v0/add?recursive=true&stream-channels=true HTTP/1.1" 200 0 "-" "/node-ipfs-api/26.1.2/"
```

To rebuild the docker image:

`sudo docker build . -t pbostrom/ipfs_testcase`
