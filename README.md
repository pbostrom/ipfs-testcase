Test case to reproduce an IPFS issue

Prereqs

Install docker/docker-compose

```
docker-compose up -d
docker run -it --network ipfs_testcase_proxy-tier pbostrom/ipfs_testcase

```

To rebuild the docker image:

`docker build . -t pbostrom/ipfs_testcase`
